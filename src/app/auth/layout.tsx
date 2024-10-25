import {PropsWithChildren} from "react";
import {AuthProvider} from "@/contexts/AuthContext";


export default function Layout({ children } : PropsWithChildren) {

    return (
    <div>
        <AuthProvider>
            {children}
        </AuthProvider>
    </div>
  );
}