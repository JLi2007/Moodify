import Webcam from "react-webcam";

const VideoOnCanvas = ({ canvasRef, webcamRef, constraints}) => {
  return(
    <div>
      <canvas
        ref={canvasRef}
        width={1100}
        height={700}
        style={{ objectFit: "cover"}}
        className="canvas"
      />
      <Webcam
        audio={false}
        mirrored={true}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={constraints}
        style={{ display: "none" }}
      />
    </div>
  )
};

export default VideoOnCanvas;

