import { useTemplate } from '@/context/templateContext'
import React from 'react'

function Header() {
    const {template} = useTemplate();
  return (
    <div>Header</div>
  )
}

export default Header