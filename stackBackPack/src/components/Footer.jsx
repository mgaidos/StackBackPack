import React from 'react'
import { DiGithubBadge } from "react-icons/di";
import { IconContext } from "react-icons";
import { FaLinkedin } from "react-icons/fa";
//styles
import '../components/Footer.scss'

const Footer = () => {
  return (
    <footer>
      <p>&copy; Martin Gaidos, 2023. Beta</p> <DiGithubBadge style={{ fontSize: '2.5rem' }} /> <FaLinkedin style={{ fontSize: '2rem' }} />
    </footer>
  )
}

export default Footer