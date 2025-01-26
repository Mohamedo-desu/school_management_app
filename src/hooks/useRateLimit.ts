import { useCallback, useEffect, useState } from 'react'

const INITIAL_SECONDS = 119

export const useRateLimit = () => {
	const [outOfTries, setOutOfTries] = useState(false)
	const [seconds, setSeconds] = useState(INITIAL_SECONDS)

	const resetRateLimit = useCallback(() => {
		setOutOfTries(true)
		setSeconds(INITIAL_SECONDS)
	}, [])

	useEffect(() => {
		let timer: NodeJS.Timeout | undefined

		if (outOfTries) {
			timer = setInterval(() => setSeconds((prev) => prev - 1), 1000)
		} else {
			setSeconds(INITIAL_SECONDS)
		}

		return () => {
			if (timer) {
				clearInterval(timer)
			}
		}
	}, [outOfTries])

	useEffect(() => {
		if (seconds <= 0) {
			setOutOfTries(false)
		}
	}, [seconds])

	return {
		outOfTries,
		seconds,
		resetRateLimit,
	}
}
