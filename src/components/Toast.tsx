import { useEffect } from "react";

interface ToastProps {
    message: string;
    type: "success" | "error";
    onClose: () => void;
    
}


export function Toast({message, type, onClose}: ToastProps) {
    
    useEffect(() => {
     const timer = setTimeout(() => {
        onClose()
     }, 3000)

     return () => {
        clearTimeout(timer)
     }
            
    },[])

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:top-4 md:right-4 md:bottom-auto z-50">
            <div className={`... ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-3 rounded-lg shadow-lg`}>
                <div className="flex items-center justify-between gap-3">
                    <span>{message}</span>
                    <button onClick={onClose}>X</button>
                </div>
            </div>
        </div>
    )    
}