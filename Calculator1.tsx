'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0')
  const [currentValue, setCurrentValue] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const handleDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? digit : display + digit)
    }
  }

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display)

    if (currentValue === null) {
      setCurrentValue(inputValue)
    } else if (operator) {
      const result = performCalculation(currentValue, inputValue, operator)
      setCurrentValue(result)
      setDisplay(String(result))
    }

    setWaitingForOperand(true)
    setOperator(nextOperator)
  }

  const handleEquals = () => {
    if (currentValue === null || operator === null) return

    const inputValue = parseFloat(display)
    const result = performCalculation(currentValue, inputValue, operator)
    setDisplay(String(result))
    setCurrentValue(null)
    setOperator(null)
    setWaitingForOperand(true)
  }

  const performCalculation = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+':
        return a + b
      case '-':
        return a - b
      case '×':
        return a * b
      case '÷':
        return a / b
      default:
        return b
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setCurrentValue(null)
    setOperator(null)
    setWaitingForOperand(false)
  }

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const handlePlusMinus = () => {
    const value = parseFloat(display)
    setDisplay(String(-value))
  }

  const handlePercent = () => {
    const value = parseFloat(display)
    setDisplay(String(value / 100))
  }

  const Button: React.FC<{ onClick: () => void; className?: string; children: React.ReactNode }> = ({
    onClick,
    className = '',
    children,
  }) => (
    <motion.button
      className={`text-2xl font-semibold rounded-full w-16 h-16 flex items-center justify-center shadow-md ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )

  return (
    <div className="bg-gray-100 p-6 rounded-3xl shadow-2xl relative">
      <div className="bg-gray-800 text-white text-right text-4xl font-bold p-4 rounded-2xl mb-4 h-24 flex items-end justify-end">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Button onClick={handleClear} className="bg-gray-300 text-gray-800">
          AC
        </Button>
        <Button onClick={handlePlusMinus} className="bg-gray-300 text-gray-800">
          ±
        </Button>
        <Button onClick={handlePercent} className="bg-gray-300 text-gray-800">
          %
        </Button>
        <Button onClick={() => handleOperator('÷')} className="bg-orange-500 text-white">
          ÷
        </Button>
        <Button onClick={() => handleDigit('7')} className="bg-gray-200 text-gray-800">
          7
        </Button>
        <Button onClick={() => handleDigit('8')} className="bg-gray-200 text-gray-800">
          8
        </Button>
        <Button onClick={() => handleDigit('9')} className="bg-gray-200 text-gray-800">
          9
        </Button>
        <Button onClick={() => handleOperator('×')} className="bg-orange-500 text-white">
          ×
        </Button>
        <Button onClick={() => handleDigit('4')} className="bg-gray-200 text-gray-800">
          4
        </Button>
        <Button onClick={() => handleDigit('5')} className="bg-gray-200 text-gray-800">
          5
        </Button>
        <Button onClick={() => handleDigit('6')} className="bg-gray-200 text-gray-800">
          6
        </Button>
        <Button onClick={() => handleOperator('-')} className="bg-orange-500 text-white">
          -
        </Button>
        <Button onClick={() => handleDigit('1')} className="bg-gray-200 text-gray-800">
          1
        </Button>
        <Button onClick={() => handleDigit('2')} className="bg-gray-200 text-gray-800">
          2
        </Button>
        <Button onClick={() => handleDigit('3')} className="bg-gray-200 text-gray-800">
          3
        </Button>
        <Button onClick={() => handleOperator('+')} className="bg-orange-500 text-white">
          +
        </Button>
        <Button onClick={() => handleDigit('0')} className="col-span-2 w-full bg-gray-200 text-gray-800">
          0
        </Button>
        <Button onClick={handleDecimal} className="bg-gray-200 text-gray-800">
          .
        </Button>
        <Button onClick={handleEquals} className="bg-green-500 text-white">
          =
        </Button>
      </div>
      <div className="absolute bottom-2 right-4 text-xs text-gray-500 font-medium">
        Made by Siddhi
      </div>
    </div>
  )
}

export default Calculator

