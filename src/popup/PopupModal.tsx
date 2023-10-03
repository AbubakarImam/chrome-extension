import logo from '../assets/icon.svg';
import { Monitor, Copy, Setting2, CloseCircle } from 'iconsax-react'
import ToggleComponent from './toggleComponent';


function PopupModal() {
    document.addEventListener("DOMContentLoaded", () => {
        const startRecordingButton = document.querySelector("#startRecordingButton");

        startRecordingButton?.addEventListener("click", () => {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                const activeTab = tabs[0];
                if (activeTab) {
                    chrome.tabs.sendMessage(activeTab.id as number, { action: 'request_recorder' }, function (response) {

                        if (!chrome.runtime.lastError) {
                            console.log(response);

                            chrome.scripting.executeScript(
                                {
                                    target: { tabId: activeTab.id as number },
                                    func: () => {
                                        document.dispatchEvent(new Event('toggleDraggableComponent'));
                                    },
                                },
                                () => {
                                    console.log('Script injected and event dispatched');
                                }
                            );

                            chrome.runtime.sendMessage({ action: 'startRecording' });

                        } else {
                            console.error(chrome.runtime.lastError, 'error line 40');
                        }
                    })
                } else {
                    console.error('Active tab not found');
                }
            });
        });
    });




    return (
        <div className='p-6 mt-4 bg-gray-200 rounded-3xl gap-6'>
            <div className='flex justify-between items-center mb-6'>
                <div className="flex items-center">
                    <img src={logo} alt="logo" />
                    <span className='text-base font-bold font-sora text-[#120B48]'>HelpMeOut</span>
                </div>
                <div className="flex space-x-2 ">
                    <Setting2 className='text-xl text-[#928FAB] active:text-[#120B48] hover:text-[#120B48]' />
                    <CloseCircle className='text-xl text-[#928FAB] active:text-[#120B48] hover:text-[#120B48]' />
                </div>
            </div>
            <div className="text-justify p-6 mb-6">
                <p>This extension helps you record and share help videos with ease.</p>
            </div>
            <div className='flex justify-around items-center text-[#120B48] mb-6'>
                <div className="space-y-2 flex flex-col items-center text-[#928FAB] hover:text-[#120B48] active:text-[#120B48]">
                    <Monitor className='text-[2rem]' />
                    <span>Full screen</span>
                </div>
                <div className="space-y-2 flex flex-col items-center text-[#928FAB] hover:text-[#120B48] active:text-[#120B48]">
                    <Copy className='text-[2rem]' />
                    <span>Current Tab</span>
                </div>
            </div>
            <ToggleComponent />
            <div className="flex justify-center items-center">
                <button id='startRecordingButton' className="w-[80%] mx-auto p-3 bg-[#120B48] text-[#FAFDFF] font-medium text-base 
                font-work-sans rounded-xl cursor-pointer">
                    Start Recording
                </button>
            </div>
        </div>
    )
}

export default PopupModal
