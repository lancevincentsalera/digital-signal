import React, { useState, useMemo } from "react";
import {
  bipolarAMI,
  differentialManchester,
  manchester,
  nrzI,
  nrzL,
  pseudoternary,
} from "./EncodingTechniques";
import "./visualizer.scss";

const Visualizer = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const techniques = useMemo(() => {
    if (data.length > 0 && /^[01]+$/.test(data)) {
      return [
        nrzL(data),
        nrzI(data),
        bipolarAMI(data),
        pseudoternary(data),
        manchester(data),
        differentialManchester(data),
      ];
    }
    return [];
  }, [data]);

  const names = [
    "NRZ-L",
    "NRZ-I",
    "Bipolar-AMI",
    "Pseudoternary",
    "Manchester",
    "Differential Manchester",
  ];

  return (
    <div className="visualizer">
      <p className="heading">Digital Signal Visualizer</p>
      <p className="subheading">by: Lance Vincent A. Salera</p>

      <div className="input-group">
        <input
          type="text"
          value={data}
          onChange={(e) => {
            if (e.target.value.length === 0) {
              setError("Please input something in the input field");
            } else if (!/^[01]+$/.test(e.target.value)) {
              setError("Input data is not binary");
            } else {
              setError("");
            }
            setData(e.target.value);
          }}
          placeholder="Input binary data"
          aria-label="Binary input"
          maxLength={21}
        />
      </div>

      {error && <p className="error">{error}</p>}

      <div className="main">
        <div className="data">
          {error.length === 0 &&
            [...data].map((char, index) => <span key={index}>{char}</span>)}
        </div>

        {techniques.length > 0 &&
          techniques.map((technique, i) => (
            <div className="signal" key={i}>
              <span>{names[i]}</span>
              <svg
                width={`${technique.length * 50}`}
                height="52.5"
                style={{ border: "1px solid black" }}
              >
                {technique.map((_, i) => {
                  const x = (i + 1) * 50;
                  return (
                    <line
                      key={`col-${i}`}
                      x1={x}
                      y1={0}
                      x2={x}
                      y2={50}
                      stroke="black"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                    />
                  );
                })}
                {technique.map((point, i) => {
                  const x1 = point.x * 50;
                  const y1 = point.y;
                  const x2 = (point.x + 1) * 50;
                  const y2 = point.y;

                  return (
                    <React.Fragment key={`${x1}-${y1}-${x2}-${y2}`}>
                      {point.x2 !== undefined && point.y2 !== undefined ? (
                        <>
                          {i === 0 && (
                            <line
                              x1={x1}
                              y1={point.y2}
                              x2={x1}
                              y2={y1}
                              stroke="red"
                              strokeWidth="3"
                            />
                          )}
                          {/* 0, 50, 25, 0 */}
                          {/* 01 */}
                          <line
                            x1={x1} //0
                            y1={y1} //50
                            x2={point.x2 * 50} //25
                            y2={y1} //50
                            stroke="red"
                            strokeWidth="3"
                          />
                          <line
                            x1={point.x2 * 50}
                            y1={y2}
                            x2={point.x2 * 50}
                            y2={point.y2}
                            stroke="red"
                            strokeWidth="3"
                          />
                          <line
                            x1={point.x2 * 50} // 25
                            y1={point.y2} // 0
                            x2={x2} // 50
                            y2={point.y2} // 0
                            stroke="red"
                            strokeWidth="3"
                          />
                          {technique[i + 1] &&
                            technique[i + 1].y !== point.y2 && (
                              <line
                                x1={x2}
                                y1={point.y2}
                                x2={x2}
                                y2={technique[i + 1].y}
                                stroke="red"
                                strokeWidth="3"
                              />
                            )}
                        </>
                      ) : (
                        <>
                          <line
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="red"
                            strokeWidth="3"
                          />

                          {technique[i + 1] &&
                            technique[i + 1].y !== point.y && (
                              <line
                                x1={x2}
                                y1={y1}
                                x2={x2}
                                y2={technique[i + 1].y}
                                stroke="red"
                                strokeWidth="3"
                              />
                            )}
                        </>
                      )}
                    </React.Fragment>
                  );
                })}
              </svg>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Visualizer;
