import { ReactNode, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { logout } from '@/stores/authSlice'
import { useDispatch } from 'react-redux'
import { AppThunkDispatch } from '@/stores/store'

type Props = {
  children: ReactNode
}

export default function MainLayout({ children }: Props) {

  const router = useRouter();
  // Not a really clean way to handle this...
  const isLogin = router.pathname.startsWith("/login");

  useEffect(() => {
    // Ideally I should handle this in a middleware...
    const storage = localStorage.getItem("persist:root") || ""
    const parsedStorage = JSON.parse(storage)

    if (parsedStorage.token == "null") {
      router.push('/login');
    }
  }, []);

  const dispatch = useDispatch<AppThunkDispatch>();
  const handleLogout = useCallback(() => {
    dispatch(logout());
    router.push('/login');
  }, [dispatch]);

  return (
    (isLogin ? (
      <>
        {children}
      </>
    ):(
      <div className="overflow-hidden bg-gradient-to-tr from-gray-700 to-gray-800">
        <div className="pl-60 pt-10 min-h-screen w-screen transition-position w-auto">
            <aside className="left-0 w-60 fixed flex top-0 h-screen transition-position">
              <div className="flex-1 flex flex-col bg-gray-900/40">
                  <div className="flex flex-row h-14 items-center justify-between">
                    <div className="text-center flex-1 text-left text-center pl-0">
                      <b className="font-black text-lg">BeesBusy Dashboard</b>
                    </div>
                  </div>
                  <div className="flex-1 pl-4 mt-4 overflow-y-auto overflow-x-hidden">
                    <ul>
                        <li>
                          <Link href="/" className="flex h-12 text-gray-300 hover:text-white">
                              Home
                          </Link>
                        </li>
                        <li>
                          <Link href="/users" className="flex h-12 text-gray-300 hover:text-white">
                              Users
                          </Link>
                        </li>
                    </ul>
                  </div>
                <p className="pl-2 text-stone-300">
                  <a href="#" onClick={handleLogout} className="mb-2 font-bold h-3">Log Out</a>
                </p>
              </div>
            </aside>
            {children}
        </div>
      </div>
    ))
  )
}
