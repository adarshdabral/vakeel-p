"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useNotificationStore } from "@/store/notification-store";

type Booking = {
	_id: string;
	matter: string;
	clientId: string;
	status: string;
	[key: string]: any;
};

const LawyerBookingsPage = () => {
	const pushToast = useNotificationStore((state) => state.pushToast);
	const user = useAuthStore((state) => state.user);
	const [bookings, setBookings] = useState<Booking[]>([]);
	const [loading, setLoading] = useState(false);
	const [updatingId, setUpdatingId] = useState<string | null>(null);

	useEffect(() => {
		if (!user?.id) return;
		const fetchBookings = async () => {
			setLoading(true);
			try {
				// First, fetch the lawyer profile to get lawyerId
				const lawyerRes = await fetch(`/api/lawyers/me`);
				const lawyerData = await lawyerRes.json();
				const lawyerId = lawyerData.lawyer?._id;
				
				if (!lawyerId) {
					pushToast({ title: "Error", description: "Lawyer profile not found", variant: "error" });
					setLoading(false);
					return;
				}

				// Then fetch bookings using the lawyerId
				const res = await fetch(`/api/bookings?status=pending&lawyerId=${lawyerId}`);
				const data = await res.json();
				setBookings(data.data || []);
			} catch (e) {
				pushToast({ title: "Error", description: "Failed to load bookings", variant: "error" });
			} finally {
				setLoading(false);
			}
		};
		fetchBookings();
	}, [pushToast, user]);

	const handleAccept = async (id: string) => {
		setUpdatingId(id);
		try {
			const res = await fetch("/api/bookings", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id, status: "active" }),
			});
			if (!res.ok) throw new Error("Failed to update booking");
			pushToast({ title: "Booking accepted", description: `Booking ${id} is now active.`, variant: "success" });
			setBookings((prev) => prev.filter((b) => b._id !== id));
		} catch (e) {
			pushToast({ title: "Error", description: "Failed to accept booking", variant: "error" });
		} finally {
			setUpdatingId(null);
		}
	};

	if (!user?.id) {
		return <p className="text-slate-500">Please log in as a lawyer to view bookings.</p>;
	}

	return (
		<section className="space-y-6">
			<header>
				<h1 className="font-display text-3xl text-accent">Booking requests</h1>
				<p className="text-slate-500">Accept pending consultations.</p>
			</header>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div className="space-y-4">
					{bookings.length === 0 ? (
						<p className="text-slate-500">No pending bookings.</p>
					) : (
						bookings.map((booking) => (
							<Card key={booking._id}>
								<CardHeader>
									<CardTitle>{booking.matter}</CardTitle>
									<CardDescription>Client #{booking.clientId}</CardDescription>
								</CardHeader>
								<CardContent className="flex flex-wrap items-center justify-between gap-4">
									<p className="text-sm text-slate-500">Current status: {booking.status}</p>
									<div className="flex gap-2">
										<Button
											variant="secondary"
											onClick={() => handleAccept(booking._id)}
											disabled={updatingId === booking._id}
										>
											{updatingId === booking._id ? "Accepting..." : "Accept"}
										</Button>
									</div>
								</CardContent>
							</Card>
						))
					)}
				</div>
			)}
		</section>
	);
};

export default LawyerBookingsPage;
