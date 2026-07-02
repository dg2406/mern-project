import React from "react";
import Footer from "./footer";
import Header from "./header";
import ChatBot from "./chatbot";
import { Helmet } from "react-helmet";
import { useAuth } from "../context/auth";
import "./Layout.css";

const Layout = ({
  children,
  title,
  author,
  keywords,
  description,
}) => {

  const [auth] = useAuth();

  return (
    <div className="layout">

      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={description}
        />

        <meta
          name="keywords"
          content={keywords}
        />

        <meta
          name="author"
          content={author}
        />

        <title>{title}</title>
      </Helmet>

      <Header />

      <main className="main">
        {children}
      </main>

      {/* Show chatbot only after login */}

      {auth?.user && (
        <ChatBot />
      )}

      <Footer />

    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce App",
  description: "mern stack project",
  keywords: "mern,react,mongodb",
  author: "dhruvg",
};

export default Layout;