import 'flatpickr/dist/themes/material_green.css';

import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';

import Flatpickr from '../lib/index.js';

const App = () => {
  const [value, setValue] = useState('2016-01-01 01:01');
  const [onChange, setOnChange] = useState(() => (_, str) => {
    console.info(str);
  });
  const [range, setRange] = useState([new Date()]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [handler, setHandler] = useState(() => (dates) => {
    console.log('initial handler', dates);
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue((v) => v.replace('2016', '2017'));
      setOnChange(() => (_, str) => {
        console.info('New change handler: ', str);
      });
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const sharedOptions = {
    enableTime: true
  };

  return (
    <main>
      <Flatpickr
        data-enable-time
        className="test"
        onChange={[
          (_, str) => {
            console.info('First prop handler', str);
          },
          (_, str) => {
            console.info('Second prop handler', str);
          }
        ]}
        options={{
          onChange: [
            (_, str) => {
              console.info('First options handler', str);
            },
            (_, str) => {
              console.info('Second options handler', str);
            }
          ]
        }}
      />
      <Flatpickr data-enable-time defaultValue="2016-11-11 11:11" onChange={handler} />
      <button
        type="button"
        onClick={() => {
          setHandler(() => (dates) => {
            console.log('new handler', dates);
          });
        }}
      >
        Change handler
      </button>
      <Flatpickr data-enable-time value={value} onChange={(_, str) => console.info(str)} />
      <Flatpickr value={value} options={{minDate: '2016-11-01'}} onChange={(_, str) => console.info(str)} />
      <Flatpickr
        value={range}
        options={{mode: 'range'}}
        onChange={(dates, str) => {
          setRange(dates);
          console.info('range changed', dates, str);
        }}
      />
      <Flatpickr
        onChange={onChange}
        onOpen={() => {
          console.info('opened (by prop)');
        }}
        options={{
          onClose: () => {
            console.info('closed (by option)');
          },
          maxDate: new Date()
        }}
      />
      <Flatpickr value={new Date()} onChange={(_, str) => console.info(str)} />
      <Flatpickr value={value} options={{wrap: true}} onChange={(_, str) => console.info(str)}>
        <input type="text" data-input />
        <button type="button" data-toggle>
          Toggle
        </button>
        <button type="button" data-clear>
          Clear
        </button>
      </Flatpickr>
      <Flatpickr
        defaultValue="2019-05-05"
        onCreate={(flatpickr) => {
          this.calendar = flatpickr;
        }}
        onDestroy={() => {
          delete this.calendar;
        }}
        render={({defaultValue}, ref) => {
          return (
            <div>
              <input defaultValue={defaultValue} ref={ref} />
              <button onClick={() => this.calendar.setDate(new Date())}>Today</button>
            </div>
          );
        }}
      />

      <div>
        <h2>Shared</h2>
        <Flatpickr
          value={startDate}
          options={sharedOptions}
          onChange={(date) => {
            setStartDate(date);
          }}
        />
        <Flatpickr
          value={endDate}
          options={sharedOptions}
          onChange={(date) => {
            setEndDate(date);
          }}
        />

        <dl>
          <dt>Start</dt>
          <dd>{startDate?.toString()}</dd>
          <dt>End</dt>
          <dd>{endDate?.toString()}</dd>
        </dl>
      </div>
    </main>
  );
};

createRoot(document.querySelector('#container')).render(<App />);
