import React from 'react'
import { LineChart, Line, XAxis, YAxis } from 'recharts'
import CountUp from 'react-countup'
import { useAppSelector } from '@/views/User/Earn/Game/Single/List/NumberGuess/src/store'

function Graph() {
    const generatedValue = useAppSelector(
        (state) => state.NumberGuess.data.generatedValue
    )
    const graphValue = [{ value: 0 }, { value: 0 }, { value: generatedValue }]
    const speedValue = useAppSelector((state) => state.NumberGuess.data.speed)

    function calcSpeed() {
        return 3000 + 1000 * speedValue
    }

    return (
        <div className="col-12 mt-3">
            <div className="card-box graph-box">
                <div className="result">
                    <CountUp
                        start={0}
                        end={generatedValue}
                        redraw={false}
                        duration={calcSpeed() / 1000}
                        separator=" "
                        decimals={2}
                        decimal="."
                        prefix=""
                        suffix="x"
                    ></CountUp>
                </div>

                <LineChart
                    width={500}
                    height={300}
                    data={graphValue}
                    key={Math.random()}
                >
                    <Line
                        type="monotone"
                        dataKey="value"
                        strokeWidth={3}
                        stroke="#fb544e"
                        dot={false}
                        animationDuration={calcSpeed()}
                        hide={generatedValue === 0}
                    />
                    <YAxis domain={[0, 10]} hide={true} />
                    <XAxis dataKey="value" hide={true} />
                </LineChart>
            </div>
        </div>
    )
}

export default Graph
