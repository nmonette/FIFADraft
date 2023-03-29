import Collapsible  from 'react-collapsible';

import Box  from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import { useState } from 'react';

const columns = [
    {
      field: 'Known As',
      headerName: 'Known As',
      width: 150,
      editable: true,
      },
      {
      field: 'Full Name',
      headerName: 'Full Name',
      width: 150,
      editable: true,
      },
      {
      field: 'Overall',
      headerName: 'Overall',
      width: 150,
      editable: true,
      },
      {
      field: 'Potential',
      headerName: 'Potential',
      width: 150,
      editable: true,
      },
      {
      field: 'Value(in Euro)',
      headerName: 'Value(in Euro)',
      width: 150,
      editable: true,
      },
      {
      field: 'Positions Played',
      headerName: 'Positions Played',
      width: 150,
      editable: true,
      },
      {
      field: 'Best Position',
      headerName: 'Best Position',
      width: 150,
      editable: true,
      },
      {
      field: 'Nationality',
      headerName: 'Nationality',
      width: 150,
      editable: true,
      },
      {
      field: 'Age',
      headerName: 'Age',
      width: 150,
      editable: true,
      },
      {
      field: 'Height(in cm)',
      headerName: 'Height(in cm)',
      width: 150,
      editable: true,
      },
      {
      field: 'Weight(in kg)',
      headerName: 'Weight(in kg)',
      width: 150,
      editable: true,
      },
      {
      field: 'TotalStats',
      headerName: 'TotalStats',
      width: 150,
      editable: true,
      },
      {
      field: 'BaseStats',
      headerName: 'BaseStats',
      width: 150,
      editable: true,
      },
      {
      field: 'Club Name',
      headerName: 'Club Name',
      width: 150,
      editable: true,
      },
      {
      field: 'Club Position',
      headerName: 'Club Position',
      width: 150,
      editable: true,
      },
      {
      field: 'Preferred Foot',
      headerName: 'Preferred Foot',
      width: 150,
      editable: true,
      },
      {
      field: 'Weak Foot Rating',
      headerName: 'Weak Foot Rating',
      width: 150,
      editable: true,
      },
      {
      field: 'Skill Moves',
      headerName: 'Skill Moves',
      width: 150,
      editable: true,
      },
      {
      field: 'National Team Name',
      headerName: 'National Team Name',
      width: 150,
      editable: true,
      },
      {
      field: 'National Team Position',
      headerName: 'National Team Position',
      width: 150,
      editable: true,
      },
      {
      field: 'Attacking Work Rate',
      headerName: 'Attacking Work Rate',
      width: 150,
      editable: true,
      },
      {
      field: 'Defensive Work Rate',
      headerName: 'Defensive Work Rate',
      width: 150,
      editable: true,
      },
      {
      field: 'Pace Total',
      headerName: 'Pace Total',
      width: 150,
      editable: true,
      },
      {
      field: 'Shooting Total',
      headerName: 'Shooting Total',
      width: 150,
      editable: true,
      },
      {
      field: 'Passing Total',
      headerName: 'Passing Total',
      width: 150,
      editable: true,
      },
      {
      field: 'Dribbling Total',
      headerName: 'Dribbling Total',
      width: 150,
      editable: true,
      },
      {
      field: 'Defending Total',
      headerName: 'Defending Total',
      width: 150,
      editable: true,
      },
      {
      field: 'Physicality Total',
      headerName: 'Physicality Total',
      width: 150,
      editable: true,
      },
      {
      field: 'Crossing',
      headerName: 'Crossing',
      width: 150,
      editable: true,
      },
      {
      field: 'Finishing',
      headerName: 'Finishing',
      width: 150,
      editable: true,
      },
      {
      field: 'Heading Accuracy',
      headerName: 'Heading Accuracy',
      width: 150,
      editable: true,
      },
      {
      field: 'Short Passing',
      headerName: 'Short Passing',
      width: 150,
      editable: true,
      },
      {
      field: 'Volleys',
      headerName: 'Volleys',
      width: 150,
      editable: true,
      },
      {
      field: 'Dribbling',
      headerName: 'Dribbling',
      width: 150,
      editable: true,
      },
      {
      field: 'Curve',
      headerName: 'Curve',
      width: 150,
      editable: true,
      },
      {
      field: 'Freekick Accuracy',
      headerName: 'Freekick Accuracy',
      width: 150,
      editable: true,
      },
      {
      field: 'LongPassing',
      headerName: 'LongPassing',
      width: 150,
      editable: true,
      },
      {
      field: 'BallControl',
      headerName: 'BallControl',
      width: 150,
      editable: true,
      },
      {
      field: 'Acceleration',
      headerName: 'Acceleration',
      width: 150,
      editable: true,
      },
      {
      field: 'Sprint Speed',
      headerName: 'Sprint Speed',
      width: 150,
      editable: true,
      },
      {
      field: 'Agility',
      headerName: 'Agility',
      width: 150,
      editable: true,
      },
      {
      field: 'Reactions',
      headerName: 'Reactions',
      width: 150,
      editable: true,
      },
      {
      field: 'Balance',
      headerName: 'Balance',
      width: 150,
      editable: true,
      },
      {
      field: 'Shot Power',
      headerName: 'Shot Power',
      width: 150,
      editable: true,
      },
      {
      field: 'Jumping',
      headerName: 'Jumping',
      width: 150,
      editable: true,
      },
      {
      field: 'Stamina',
      headerName: 'Stamina',
      width: 150,
      editable: true,
      },
      {
      field: 'Strength',
      headerName: 'Strength',
      width: 150,
      editable: true,
      },
      {
      field: 'Long Shots',
      headerName: 'Long Shots',
      width: 150,
      editable: true,
      },
      {
      field: 'Aggression',
      headerName: 'Aggression',
      width: 150,
      editable: true,
      },
      {
      field: 'Interceptions',
      headerName: 'Interceptions',
      width: 150,
      editable: true,
      },
      {
      field: 'Positioning',
      headerName: 'Positioning',
      width: 150,
      editable: true,
      },
      {
      field: 'Vision',
      headerName: 'Vision',
      width: 150,
      editable: true,
      },
      {
      field: 'Penalties',
      headerName: 'Penalties',
      width: 150,
      editable: true,
      },
      {
      field: 'Composure',
      headerName: 'Composure',
      width: 150,
      editable: true,
      },
      {
      field: 'Marking',
      headerName: 'Marking',
      width: 150,
      editable: true,
      },
      {
      field: 'Standing Tackle',
      headerName: 'Standing Tackle',
      width: 150,
      editable: true,
      },
      {
      field: 'Sliding Tackle',
      headerName: 'Sliding Tackle',
      width: 150,
      editable: true,
      },
      {
      field: 'Goalkeeper Diving',
      headerName: 'Goalkeeper Diving',
      width: 150,
      editable: true,
      },
      {
      field: 'Goalkeeper Handling',
      headerName: 'Goalkeeper Handling',
      width: 150,
      editable: true,
      },
      {
      field: ' GoalkeeperKicking',
      headerName: ' GoalkeeperKicking',
      width: 150,
      editable: true,
      },
      {
      field: 'Goalkeeper Positioning',
      headerName: 'Goalkeeper Positioning',
      width: 150,
      editable: true,
      },
      {
      field: 'Goalkeeper Reflexes',
      headerName: 'Goalkeeper Reflexes',
      width: 150,
      editable: true,
      },
      {
      field: 'ST Rating',
      headerName: 'ST Rating',
      width: 150,
      editable: true,
      },
      {
      field: 'LW Rating',
      headerName: 'LW Rating',
      width: 150,
      editable: true,
      },
      {
      field: 'LF Rating',
      headerName: 'LF Rating',
      width: 150,
      editable: true,
      },
      {
      field: 'CF Rating',
      headerName: 'CF Rating',
      width: 150,
      editable: true,
      },
      {
      field: 'RF Rating',
      headerName: 'RF Rating',
      width: 150,
      editable: true,
      },
      {
      field: 'RW Rating',
      headerName: 'RW Rating',
      width: 150,
      editable: true,
      },
      {
      field: 'CAM Rating',
      headerName: 'CAM Rating',
      width: 150,
      editable: true,
      },
      {
      field: 'LM Rating',
      headerName: 'LM Rating',
      width: 150,
      editable: true,
      },
      {
      field: 'CM Rating',
      headerName: 'CM Rating',
      width: 150,
      editable: true,
      },
      {
      field: 'RM Rating',
      headerName: 'RM Rating',
      width: 150,
      editable: true,
      },
      {
      field: 'LWB Rating',
      headerName: 'LWB Rating',
      width: 150,
      editable: true,
      },
      {
      field: 'CDM Rating',
      headerName: 'CDM Rating',
      width: 150,
      editable: true,
      },
      {
      field: 'RWB Rating',
      headerName: 'RWB Rating',
      width: 150,
      editable: true,
      },
      {
      field: 'LB Rating',
      headerName: 'LB Rating',
      width: 150,
      editable: true,
      },
      {
      field: 'CB Rating',
      headerName: 'CB Rating',
      width: 150,
      editable: true,
      },
      {
      field: 'RB Rating',
      headerName: 'RB Rating',
      width: 150,
      editable: true,
      },
      {
      field: 'GK Rating',
      headerName: 'GK Rating',
      width: 150,
      editable: true,
      },      
    ];

export function Roster({ user }) {
      return (
        <Collapsible trigger={user.title}>
          <Box sx={{ height: 400, width: '80%' }}>
            <DataGrid rows={user.roster} columns={columns} />
        </Box>
        </Collapsible>
    );
  }

