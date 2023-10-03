import { useState, CSSProperties } from 'react';
import { GoDotFill } from 'react-icons/go';
import { AiOutlinePause } from "react-icons/ai";
import { IoStopOutline } from "react-icons/io5";
import { HiOutlineVideoCamera, HiOutlineMicrophone, HiOutlineTrash } from 'react-icons/hi';
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

type Position = {
    xRate: number;
    yRate: number;
};

function DraggableControl() {
    const [currentPosition, setCurrentPosition] = useState<Position>({
        xRate: -150,
        yRate: -150
    });

    const onDrag = (_e: DraggableEvent, data: DraggableData) => {
        setCurrentPosition({ xRate: data.lastX, yRate: data.lastY });
    };

    document.addEventListener("DOMContentLoaded", () => {
        const pauseButton = document.querySelector("#pauseButton");
        const stopButton = document.querySelector("#stopButton");
        const micButton = document.querySelector("#micButton");
        const cameraButton = document.querySelector("#cameraButton");
        const deleteButton = document.querySelector("#deleteButton");

        pauseButton?.addEventListener("click", () => {
            chrome.runtime.sendMessage({ action: 'pauseRecording' });
        })

        stopButton?.addEventListener("click", () => {
            chrome.runtime.sendMessage({ action: 'stopRecording' });
            onStopClick();
        })

        micButton?.addEventListener("click", () => {
            chrome.runtime.sendMessage({ action: 'toggleAudio' });
        })

        cameraButton?.addEventListener("click", () => {
            chrome.runtime.sendMessage({ action: 'toggleCamera' });
        })

        deleteButton?.addEventListener("click", () => {
            chrome.runtime.sendMessage({ action: 'deleteRecording' });
            onDeleteClick();
        })
    });


    const toggleVisibility = (hidden: boolean) => {
        const component = document.getElementById('draggable-component');
        if (component) {
            component.style.visibility = hidden ? 'hidden' : 'visible';
        }
    };

    const onStopClick = () => {
        toggleVisibility(true); // Set visibility to hidden
        // Add additional logic for "Stop" button click if needed
    };

    const onDeleteClick = () => {
        toggleVisibility(true); // Set visibility to hidden
        // Add additional logic for "Delete" button click if needed
    };

    document.addEventListener('toggleDraggableComponent', () => {
        toggleVisibility(false); // Set visibility to visible
    });


    const containerStyle: CSSProperties = {
        width: '12rem',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        justifyContent: 'space-between',
        position: 'absolute',
        top: '90%',
        left: '15%',
        visibility: 'hidden',
        cursor: 'move'
        // Add more styles as needed
    };

    const rightSideStyle: CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        background: 'black',
        padding: '0.5rem',
        borderRadius: '1rem',
    };

    const leftSideStyle: CSSProperties = {
        padding: '3rem',
        backgroundColor: 'black',
        display: 'flex',
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    };

    return (
        <Draggable position={{
            x: currentPosition.xRate,
            y: currentPosition.yRate
        }}
            onDrag={onDrag} >
            <div id="draggable-component" style={containerStyle}>
                {/* Left side */}
                <div style={leftSideStyle}>
                    {/* Avatar */}
                    <svg
                        className=""
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    </svg>
                </div>

                {/* Right side */}
                <div style={rightSideStyle}>
                    {/* Video recording duration */}
                    <div style={{
                        margin: '1rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingRight: '0.5rem'
                    }}>
                        <span style={{
                            fontSize: '1.5rem',
                            color: '#FFFFFF'
                        }}>00:00:00</span>
                        <GoDotFill style={{
                            color: '#EF4444',
                            fontSize: '1rem'
                        }} />
                    </div>
                    <div style={{ borderLeft: '3px solid #FFFFFF', height: '3rem', margin: '0 1.5rem' }}></div>

                    {/* Action icons */}
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div id='pauseButton' style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#000000',
                            cursor: 'pointer'
                        }}>
                            <div style={{
                                padding: '0.2rem',
                                background: '#FFFFFF',
                                borderRadius: '50%'
                            }}>
                                <AiOutlinePause style={{ color: '#000000' }} />
                            </div>
                            <span style={{ color: '#FFFFFF' }}>Pause</span>
                        </div>
                        <div id='stopButton' style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#000000',
                            cursor: 'pointer'
                        }} onClick={onStopClick}>
                            <div style={{
                                padding: '0.2rem',
                                background: '#FFFFFF',
                                borderRadius: '50%'
                            }}>
                                <IoStopOutline style={{ color: '#000000' }} />
                            </div>
                            <span style={{ color: '#FFFFFF' }}>Stop</span>
                        </div>
                        <div id='cameraButton' style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#000000',
                            cursor: 'pointer'
                        }}>
                            <div style={{
                                padding: '0.2rem',
                                background: '#FFFFFF',
                                borderRadius: '50%'
                            }}>
                                <HiOutlineVideoCamera style={{ color: '#000000' }} />
                            </div>
                            <span style={{ color: '#FFFFFF' }}>Camera</span>
                        </div>
                        <div id='micButton' style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#000000',
                            cursor: 'pointer'
                        }}>
                            <div style={{
                                padding: '2px',
                                background: '#FFFFFF',
                                borderRadius: '50%'
                            }}>
                                <HiOutlineMicrophone style={{ color: '#000000' }} />
                            </div>
                            <span style={{ color: '#FFFFFF' }}>Mic</span>
                        </div>
                        <div id='deleteButton' style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#000000',
                            cursor: 'pointer'
                        }} onClick={onDeleteClick}>
                            <div style={{
                                padding: '0.2rem',
                                background: '#FFFFFF',
                                borderRadius: '50%'
                            }}>
                                <HiOutlineTrash style={{ color: '#000000' }} />
                            </div>
                            <span style={{ color: '#FFFFFF' }}>Delete</span>
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
    );
}


export default DraggableControl;
