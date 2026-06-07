import { useState } from 'react';
import {
  MemoryRouter,
  Routes,
  Route,
  UNSAFE_LocationContext,
  UNSAFE_NavigationContext,
  UNSAFE_DataRouterContext,
  UNSAFE_DataRouterStateContext,
  UNSAFE_RouteContext,
} from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

import Home from './pages/Home.jsx';
import Checkout from './pages/Checkout.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Account from './pages/Account.jsx';
import NotFound from './pages/NotFound.jsx';

import { products as productsData } from './data/products.js';

const defaultRouteContext = {
  outlet: null,
  matches: [],
  isDataRoute: false,
};

export default function StudentWork() {
  const [user, setUser] = useState({
    isLoggedIn: true,
    firstName: 'Waleed',
  });

  const [products] = useState(productsData);

  function toggleLogin() {
    setUser((u) => ({ ...u, isLoggedIn: !u.isLoggedIn }));
  }

  return (
    // The parent platform uses createBrowserRouter, but its route for this
    // lesson has no trailing "/*", so nested <Routes> would break.
    // We can't edit the parent router — instead we reset all 5 parent
    // router contexts and create our own independent MemoryRouter.
    // This fully isolates our routing from the platform's router.
    <UNSAFE_DataRouterContext.Provider value={null}>
      <UNSAFE_DataRouterStateContext.Provider value={null}>
        <UNSAFE_RouteContext.Provider value={defaultRouteContext}>
          <UNSAFE_LocationContext.Provider value={null}>
            <UNSAFE_NavigationContext.Provider value={null}>
              <MemoryRouter>
                <div
                  style={{
                    fontFamily: 'system-ui, Arial',
                    maxWidth: 900,
                    margin: '0 auto',
                  }}
                >
                  <aside
                    style={{
                      padding: 12,
                      marginTop: 8,
                      background: '#fafafa',
                      border: '1px solid #eee',
                    }}
                  >
                    <h3 style={{ marginTop: 0 }}>Debug Panel</h3>
                    <p>
                      Toggle login to test protected routing behavior. When
                      logged out, typing <code>/account</code> should NOT show
                      Account.
                    </p>
                    <button onClick={toggleLogin}>Toggle Logged In</button>
                  </aside>

                  <Header user={user} />

                  <main style={{ padding: 12 }}>
                    <Routes>
                      <Route path="/" element={<Home products={products} />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route
                        path="/products/:id"
                        element={<ProductDetails products={products} />}
                      />

                      {user.isLoggedIn && (
                        <Route
                          path="/account"
                          element={<Account user={user} />}
                        />
                      )}

                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>

                  <Footer />
                </div>
              </MemoryRouter>
            </UNSAFE_NavigationContext.Provider>
          </UNSAFE_LocationContext.Provider>
        </UNSAFE_RouteContext.Provider>
      </UNSAFE_DataRouterStateContext.Provider>
    </UNSAFE_DataRouterContext.Provider>
  );
}
