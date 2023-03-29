import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export function ContainedButtons() { // we will add to this later
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained">Random</Button>
    </Stack>
  );
}