import React from 'react'
import { DiGithubBadge } from "react-icons/di";
import { IconContext } from "react-icons";
import { FaLinkedin } from "react-icons/fa";
//styles
import '../components/Footer.scss'

const Footer = () => {
  return (
    <footer>
      <p>&copy; Martin Gaidos, 2023. Beta</p>
      
      <a href="https://github.com/mgaidos/StackBackPack" target='_blank'>
        <DiGithubBadge style={{ fontSize: '2rem' }} />
      </a>


      <a href="https://www.linkedin.com/in/martin-gaidos-94a679251/" target='_blank'>
        <FaLinkedin style={{ fontSize: '1.55rem' }} />
      </a>

    </footer>
  )
}

export default Footer