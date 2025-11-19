export const defaultRtcConfig: RTCConfiguration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

export function createPeerConnection({
  onTrack,
  onIceCandidate,
}: {
  onTrack?: (event: RTCTrackEvent) => void;
  onIceCandidate?: (event: RTCPeerConnectionIceEvent) => void;
}) {
  const peer = new RTCPeerConnection(defaultRtcConfig);

  if (onTrack) {
    peer.ontrack = onTrack;
  }
  if (onIceCandidate) {
    peer.onicecandidate = onIceCandidate;
  }

  return peer;
}
