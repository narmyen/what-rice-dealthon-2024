import React, { useState } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';

function SelectInput() {
  const [fertilizer, setFertilizer] = useState('');
  const [pesticide, setPesticide] = useState('');

  // Example options for fertilizers and pesticides
  const fertilizerOptions = [
    'ปุ๋ยอินทรีย์', 'ปุ๋ยเคมี', 'ปุ๋ยผสม',
  ];

  const pesticideOptions = [
    'ยาฆ่าแมลง', 'ยากำจัดเชื้อรา', 'ยากำจัดวัชพืช',
  ];

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <Autocomplete
          freeSolo // Allows free text input in addition to the list options
          value={fertilizer} // Sets the value from state
          onInputChange={(event, newInputValue) => setFertilizer(newInputValue)} // Updates state with new input
          options={fertilizerOptions} // Shows options to the user
          renderInput={(params) => (
            <TextField {...params} label="เลือกปุ๋ย" variant="outlined" />
          )}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Autocomplete
          freeSolo
          value={pesticide}
          onInputChange={(event, newInputValue) => setPesticide(newInputValue)}
          options={pesticideOptions}
          renderInput={(params) => (
            <TextField {...params} label="เลือกสารกำจัดศัตรูพืช" variant="outlined" />
          )}
        />
      </Box>
    </div>
  );
}

export default SelectInput;
