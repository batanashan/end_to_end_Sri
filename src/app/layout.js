'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.css'
const inter = Inter({ subsets: ["latin"] });
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useReducer } from "react";
import { appReducer } from "@/reducers/appReducer";
import { init } from "@/utilis/init";
import { appCtx } from "@/constants/createCtx";
import { Loader } from "@/Loader/Loader";
export default function RootLayout({ children }) {
   const [state,dispatch]=useReducer(appReducer,init)

  return (
    <html lang="en">
      <body className={inter.className}>
        <appCtx.Provider value={{state,dispatch}} >
        {children}
       {state.isLoading && <Loader/>}
        <ToastContainer/>
        </appCtx.Provider>

        </body>
    </html>
  );
}
