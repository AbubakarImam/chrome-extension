
import Camera from '../assets/video-camera.svg'
import Microphone from '../assets/microphone.svg'
function ToggleComponent() {
    return (
        <>
            <div className="rounded-xl border-[#100A42] border  items-center p-4 mb-6">
                <div className="flex justify-between items-center">
                    <div className="flex gap-1 items-center">
                        <img src={Camera} alt="camera" />
                        <span>Camera</span>
                    </div>
                    <div className="flex items-center justify-center">
                        <label htmlFor="toggleA" className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input type="checkbox" id="toggleA" className="sr-only" />
                                <div className="block bg-[#120B48]  w-10 h-6 rounded-full"></div>
                                <div className="dot1 absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            <div className="rounded-xl border-[#100A42] border  items-center p-4 mb-6">
                <div className="flex justify-between items-center">
                    <div className="flex gap-1 items-center">
                        <img src={Microphone} alt="microphone" />
                        <span>Audio</span>
                    </div>
                    <div className="flex items-center justify-center">
                        <label htmlFor="toggleB" className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input type="checkbox" id="toggleB" className="sr-only" />
                                <div className="block bg-[#120B48] w-10 h-6 rounded-full"></div>
                                <div className="dot2 absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ToggleComponent;
