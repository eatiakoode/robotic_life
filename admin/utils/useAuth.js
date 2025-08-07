import { useEffect } from 'react';
import { useRouter, useParams } from "next/navigation";

export default function useAuth() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('user');
    if (!token) {
      router.replace('/cmswegrow'); // redirect to login if no token
    }
  }, []);
}
