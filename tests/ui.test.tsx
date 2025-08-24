import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Header } from '../src/components/Header'
import React from 'react'

describe('Header', () => {
  it('renders initials', () => {
    render(<Header userInitials="MA" />)
    expect(screen.getByText('FlirtAI')).toBeTruthy()
    expect(screen.getByText('MA')).toBeTruthy()
  })
})
