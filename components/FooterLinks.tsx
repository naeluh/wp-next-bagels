import React from 'react';
import Button from './Button';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';

export default function FooterLinks() {
  const { state } = useStateMachine({ updateAction });
  const { bagelSelections } = state.data;
  const [editBagels, setEditBagels] = React.useState('');

  React.useEffect(() => {
    setEditBagels(bagelSelections.length > 0 ? 'Edit ' : 'Buy ');
  }, [bagelSelections]);

  return (
    <>
      <div className='border-m-black border-b-8 my-4 lg:hidden'></div>
      <h4 className='text-xl font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4 border-b-8 pb-4 border-m-black'>
        Quick Links
      </h4>
      <ul className=' h-full w-full'>
        <li>
          <Button
            link
            url={'bagels'}
            type={''}
            text={`${editBagels}Bagels`}
            disabled={false}
            style={{
              transition: 'all .15s ease',
            }}
            fullWidth={false}
          />
        </li>
        <li>
          <Button
            link
            url={'menu'}
            type={''}
            text={`The Bagels`}
            disabled={false}
            style={{
              transition: 'all .15s ease',
            }}
            fullWidth={false}
          />
        </li>
        <li>
          <Button
            link
            url={'location-times'}
            type={''}
            text={`Locations and Times`}
            disabled={false}
            style={{
              transition: 'all .15s ease',
            }}
            fullWidth={false}
          />
        </li>
        <li>
          <Button
            link
            url={'special-request'}
            type={''}
            text={'Special 🥯 Request'}
            disabled={false}
            style={{
              transition: 'all .15s ease',
            }}
            fullWidth={false}
          />
        </li>
      </ul>
    </>
  );
}
