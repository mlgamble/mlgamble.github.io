import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "../assets/sass/main.scss"

export default function Home() {
    return (
    <div class='container'>
    <Header />
    <main>
        Content
    </main>

    <Footer />

    </div>
    );
}