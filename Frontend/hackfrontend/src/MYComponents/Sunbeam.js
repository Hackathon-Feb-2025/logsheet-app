import React from 'react'
import Header from './Header';
import Footer from './Footer';
import SunbeamB from '../Images/sunbeamBuilding.jpg';


export default function Sunbeam() {

  return (

    <div style={{display:'flex',flexDirection:'column'}}>
    <Header/>
    <div style={{height:'60vh'}}>
        <img src={SunbeamB}  alt="Sunbeam" style={{width:'100%',height: '100%'}} title="SunbeamB"></img>
    </div> 
    <div>   
      <p style={{ flex:'1',fontSize: '1.2rem',padding:'20px',boxSizing:'border-box', textAlign:'justify',marginBottom:'20px'}}>
      At Sunbeam we believe retaining a competitive edge is imperative for any individual in today's professional world. Companies are restructuring their organizations & engineering their business processes. Not only have the challenges become more demanding, but also the rewards of staying at the forefront seem to be promising.<br></br>
      In this scenario, technical & personal skills which provide effective solutions & time critical support are of principal significance for the long term growth of professionals. Sunbeam's expertise in effectively delivering training, solutions & services has made it a favored institution to many students & professionals focused on an aggressive career growth strategy.<br></br>
     Sunbeam's proven track record in bringing about effective transformations in individuals is backed by a solid understanding of the rapidly changing needs of the industry & the global business scenario. Sunbeam's success has been built on its comprehensively researched, innovative training methodologies, deployment of technology and an emphasis on transformational & industry-relevant programs offering value-added services to its clients. A young and dynamic management team and carefully recruited and trained staff members drive Sunbeam's business vision & have established strong credentials in a short span of time.<br></br>
     Sunbeam Group's expertise in effectively delivering training & solutions has made it a favored associate to many establishments focused on aggressive growth strategies. Since it's humble beginnings in the late 90's Sunbeam Group has today, evolved into a multi-technology, multi-location competency center with IT professionals capable of delivering high-end technological training & solutions in diverse modes. Their expertise in various IT fields has made Sunbeam Group a premium turnkey solution provider.
    </p>
    </div>
    <Footer sx={{ mt: 10, mb: 4 }}/>
    </div>
  )
}
