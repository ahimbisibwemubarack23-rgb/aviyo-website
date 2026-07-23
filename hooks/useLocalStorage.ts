// hooks/useLocalStorage.ts
'use client'

import { useState, useEffect, useCallback } from 'react'

/**
 * Hook to manage localStorage items with state synchronization
 * @param key - The localStorage key
 * @param initialValue - The initial value if the key doesn't exist
 * @returns [storedValue, setValue, removeValue]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // State to store the value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Update localStorage whenever the state changes
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  // Set value with function or direct value
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue]
  )

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    if (typeof window === 'undefined') return

    try {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}

/**
 * Hook to store and retrieve a boolean preference
 */
export function useBooleanLocalStorage(key: string, initialValue: boolean = false) {
  const [value, setValue] = useLocalStorage<boolean>(key, initialValue)
  const toggle = useCallback(() => setValue(prev => !prev), [setValue])
  const setTrue = useCallback(() => setValue(true), [setValue])
  const setFalse = useCallback(() => setValue(false), [setValue])

  return { value, setValue, toggle, setTrue, setFalse }
}

/**
 * Hook to store and retrieve a JSON object
 */
export function useObjectLocalStorage<T extends Record<string, any>>(
  key: string,
  initialValue: T
) {
  const [value, setValue] = useLocalStorage<T>(key, initialValue)
  
  const updateField = useCallback(
    <K extends keyof T>(field: K, fieldValue: T[K]) => {
      setValue(prev => ({
        ...prev,
        [field]: fieldValue,
      }))
    },
    [setValue]
  )

  const reset = useCallback(() => setValue(initialValue), [setValue, initialValue])

  return { value, setValue, updateField, reset }
}

/**
 * Hook to store and retrieve an array
 */
export function useArrayLocalStorage<T>(key: string, initialValue: T[] = []) {
  const [value, setValue] = useLocalStorage<T[]>(key, initialValue)

  const add = useCallback(
    (item: T) => {
      setValue(prev => [...prev, item])
    },
    [setValue]
  )

  const remove = useCallback(
    (index: number) => {
      setValue(prev => prev.filter((_, i) => i !== index))
    },
    [setValue]
  )

  const clear = useCallback(() => {
    setValue([])
  }, [setValue])

  const update = useCallback(
    (index: number, item: T) => {
      setValue(prev => {
        const newArray = [...prev]
        newArray[index] = item
        return newArray
      })
    },
    [setValue]
  )

  return { value, setValue, add, remove, update, clear }
}