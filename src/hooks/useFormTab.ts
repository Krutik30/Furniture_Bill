import  { useCallback, useEffect } from 'react'

export default function useFormTab() {
    const keyDownHandler = useCallback((event: KeyboardEvent) => { 
        const target = event.target as HTMLButtonElement
        if (event.keyCode === 13  && target.nodeName === "INPUT") {
            const form = target.form as HTMLFormElement;
            const index = Array.prototype.indexOf.call(form, event.target);
            (form.elements[index + 2] as HTMLFormElement).focus();
            event.preventDefault();
          }
     }, []);

  useEffect(() => {
    
    document.addEventListener("keydown", keyDownHandler);
    return () => document.removeEventListener("keydown", keyDownHandler);
  }, [])
  
}
