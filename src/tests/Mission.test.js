import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Mission from '../components/Mission';
import { joinMission, leaveMission } from '../redux/missions/missionSlice';

const mockStore = configureStore([]);

describe('Mission component', () => {
  let store;
  let missions;

  beforeEach(() => {
    missions = [
      {
        mission_id: '1',
        mission_name: 'Mission 1',
        description: 'Mission 1 description',
        website: 'https://mission1.com',
        wikipedia: 'https://en.wikipedia.org/wiki/Mission1',
        twitter: 'https://twitter.com/mission1',
        reserved: false,
      },
      {
        mission_id: '2',
        mission_name: 'Mission 2',
        description: 'Mission 2 description',
        website: 'https://mission2.com',
        wikipedia: 'https://en.wikipedia.org/wiki/Mission2',
        twitter: 'https://twitter.com/mission2',
        reserved: true,
      },
    ];

    store = mockStore({
      mission: {
        missions,
        isLoading: false,
      },
    });

    store.dispatch = jest.fn();
  });

  test('renders mission data', () => {
    render(
      <Provider store={store}>
        <Mission />
      </Provider>,
    );

    missions.forEach((mission) => {
      const missionName = screen.getByText(mission.mission_name);
      const missionDescription = screen.getByText(mission.description);

      expect(missionName).toBeInTheDocument();
      expect(missionDescription).toBeInTheDocument();
    });
  });

  test('dispatches joinMission action when Join Mission button is clicked', () => {
    render(
      <Provider store={store}>
        <Mission />
      </Provider>,
    );

    const joinMissionButton = screen.getByText('Join Mission');
    fireEvent.click(joinMissionButton);

    expect(store.dispatch).toHaveBeenCalledWith(joinMission('1'));
  });

  test('dispatches leaveMission action when Leave Mission button is clicked', () => {
    render(
      <Provider store={store}>
        <Mission />
      </Provider>,
    );

    const leaveMissionButton = screen.getByText('Leave Mission');
    fireEvent.click(leaveMissionButton);

    expect(store.dispatch).toHaveBeenCalledWith(leaveMission('2'));
  });

  test('renders Not A Member button when mission is not reserved', () => {
    render(
      <Provider store={store}>
        <Mission />
      </Provider>,
    );

    const notMemberButton = screen.getByText('Not A Member');
    expect(notMemberButton).toBeInTheDocument();
  });

  test('renders Active Member button when mission is reserved', () => {
    render(
      <Provider store={store}>
        <Mission />
      </Provider>,
    );

    const activeMemberButton = screen.getByText('Active Member');
    expect(activeMemberButton).toBeInTheDocument();
  });
});
