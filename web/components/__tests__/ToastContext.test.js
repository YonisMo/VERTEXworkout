import React from 'react'
import { render, screen, act } from '@testing-library/react'
import { ToastProvider, useToast } from '../../components/ToastContext'

function TestTrigger(){
  const { addToast } = useToast()
  return <button onClick={() => addToast('hello test', 'success')}>trigger</button>
}

describe('ToastProvider', () => {
  beforeAll(() => jest.useFakeTimers())
  afterAll(() => jest.useRealTimers())

  it('shows toast when added and auto-dismisses', () => {
    render(
      <ToastProvider>
        <TestTrigger />
      </ToastProvider>
    )

    const btn = screen.getByText('trigger')
    act(() => btn.click())

    // toast should appear
    expect(screen.getByText('hello test')).toBeInTheDocument()

    // advance timers to auto-dismiss
    act(() => jest.advanceTimersByTime(3600))

    expect(screen.queryByText('hello test')).not.toBeInTheDocument()
  })
})
