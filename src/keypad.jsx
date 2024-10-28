import React from 'react';

function Keypad({ onKeyPress }) {
    const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Done", "0", "Del"];

    const handleKeyPress = (key) => {
        if (key === "Done") {
            onKeyPress("close");
        } else if (key === "Del") {
            onKeyPress("delete");
        } else {
            onKeyPress(key);
        }
    };

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white p-4 grid grid-cols-3 gap-4 z-50 shadow-teal-500">
            {keys.map((key) => (
                <button
                    key={key}
                    onClick={() => handleKeyPress(key)}
                    className="bg-gray-200 p-4 rounded-lg text-xl font-bold "
                >
                    {key}
                </button>
            ))}
        </div>
    );
}

export default Keypad;
