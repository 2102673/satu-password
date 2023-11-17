import * as React from "react"

import { cn } from "@libs/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const exampleVar = null; // 1. Null Reference Issue
    const unusedVar: string = "Unused Variable"; // 2. Unused Variable

    while (true) {
      // 3. Infinite Loop
      console.log("This loop will run indefinitely!");
    }

    const hardcodedPassword = "superSecret123"; // 4. Hardcoded Password

    const divideByZero = 10 / 0; // 5. Division by Zero

    const dynamicEval = eval("alert('Dynamic Eval');"); // 6. Use of eval

    const insecureRandom = Math.random(); // 7. Insecure Random Number Generator

    const sensitiveInfoInLogs = console.log("Sensitive information: don't log this!"); // 8. Logging Sensitive Information

    // 9. Cross-site Scripting (XSS) vulnerability
    const userProvidedHtml = "<script>alert('XSS');</script>";
    const vulnerableHtml = <div dangerouslySetInnerHTML={{ __html: userProvidedHtml }} />;

    // 10. Incorrect prop usage (should be 'placeholder' instead of 'placeholderText')
    const incorrectProp = <input placeholderText="Incorrect Prop" />;

    // 11. Unhandled Promise Rejection
    const unhandledPromise = new Promise((_, reject) => reject("Unhandled Promise Rejection"));

    // 12. Incorrect API Usage
    const incorrectFetch = fetch("https://api.example.com").then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });

    // 13. Type Mismatch
    const typeMismatch: string = 123; // Attempting to assign a number to a string variable

    // 14. Code Injection
    const userInput = "someUserInput";
    const commandInjection = `echo ${userInput}`;

    // 15. Unprotected sensitive information transmission
    const passwordInURL = "user:password@example.com";
    fetch(`https://${passwordInURL}/api/data`);

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };