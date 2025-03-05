import HeaderBox from "@/components/HeaderBox"
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react"
import RightSideBar from "@/components/RightSideBar";

const Home = () => {
  const loggedIn = {firstName: 'Jonas', lastName:'Maia', email:'maia.jonas2000@gmail.com' } ;
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
         <HeaderBox
          type="greeting"
          title="Bem vindo"
          user={loggedIn?.firstName || 'Guest'}
          subtext = "acessar e controlar suas finanças"
         />
          <TotalBalanceBox
          accounts = {[]}
          totalBanks={1}
          totalCurrentBalance={1250.35}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      <div>
        <RightSideBar
        user = {loggedIn}
        transactions={[]}
        banks= {[{currentBalance:210.50},{currentBalance:32.90}]}
        />
      </div>
    </section>
  )
}
export default Home