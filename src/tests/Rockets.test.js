import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Rockets from '../components/Rockets';
import { reserveRocket } from '../redux/rockets/rocketsSlice';

const mockStore = configureStore([]);

describe('Rockets Component', () => {
  let store;

  beforeEach(() => {
    const initialState = {
      rockets: {
        rockets: [
          {
            id: '1',
            flickr_images: [
              'https://imgur.com/DaCfMsj.jpg',
              'https://imgur.com/azYafd8.jpg',
            ],
            description: 'The Falcon 1 was an expendable launch system privately developed and manufactured by SpaceX during 2006-2009. On 28 September 2008, Falcon 1 became the first privately-developed liquid-fuel launch vehicle to go into orbit around the Earth.',
            name: 'Falcon 1',
          },
          {
            id: '2',
            flickr_images: [
              'https://farm1.staticflickr.com/929/28787338307_3453a11a77_b.jpg',
            ],
            description: 'Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit.',
            name: 'Falcon 9',
          },
          {
            id: '3',
            flickr_images: [
              'https://farm5.staticflickr.com/4599/38583829295_581f34dd84_b.jpg',
            ],
            description: 'With the ability to lift into orbit over 54 metric tons (119,000 lb)--a mass equivalent to a 737 jetliner loaded with passengers, crew, luggage and fuel--Falcon Heavy can lift more than twice the payload of the next closest operational vehicle, the Delta IV Heavy, at one-third the cost.',
            rocket_id: 'falconheavy',
            name: 'Falcon Heavy',
          },
          {
            id: '4',
            flickr_images: [
              'https://live.staticflickr.com/65535/48954138962_ee541e6755_b.jpg',
            ],
            description: 'Starship and Super Heavy Rocket represent a fully reusable transportation system designed to service all Earth orbit needs as well as the Moon and Mars. This two-stage vehicle — composed of the Super Heavy rocket (booster) and Starship (ship) — will eventually replace Falcon 9, Falcon Heavy and Dragon.',
            name: 'Starship',
          },
        ],
        isLoading: false,
        error: '',
      },
    };
    store = mockStore(initialState);
  });

  test('should reserve a rocket when the reserve button is clicked', () => {
    store.dispatch = jest.fn();
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );
    const reserveButton = screen.getByTestId('reserve-button-1');
    fireEvent.click(reserveButton);
    expect(store.dispatch).toHaveBeenCalledWith(reserveRocket('1'));
  });
});
