import React, { FC, useEffect, useState } from 'react';
import { Box, Link } from '@mui/material';
import { Link as RouteLink } from 'react-router-dom';
import { ILabel } from '../../../../models/ILabel';
import { INote } from '../../../../models/INote';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  note: INote;
};

const NoteLabels: FC<Props> = ({ note }) => {
  const [visibleLabels, setVisibleLabels] = useState<ILabel[]>([]);
  const [hiddenLabels, setHiddenLabels] = useState<ILabel[]>([]);

  useEffect(() => {
    if (note.labels.length <= 3) {
      setVisibleLabels(note.labels.slice());
    } else {
      setVisibleLabels(note.labels.slice(0, 3));
      setHiddenLabels(note.labels.slice(3));
    }
  }, [note.labels]);

  if (hiddenLabels.length > 0) {
    return (
      <Box>
        {visibleLabels.map((label) => (
          <RouteLink
            key={label.id}
            to={`/app/?label=${label.title}`}
            onClick={(e: any) => {
              e.stopPropagation();
            }}
          >
            <Link underline="hover" variant="body2" sx={{ cursor: 'pointer' }}>
              #{label.title}
            </Link>
          </RouteLink>
        ))}
        <Link
          underline="none"
          variant="body2"
          sx={{ cursor: 'pointer' }}
          onClick={(e: any) => {
            e.stopPropagation();
            setVisibleLabels([...visibleLabels, ...hiddenLabels]);
            setHiddenLabels([]);
          }}
        >
          {' '}
          and {hiddenLabels.length} more...
        </Link>
      </Box>
    );
  } else {
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {visibleLabels.map((label) => (
          <RouteLink
            key={label.id}
            to={`/app/?label=${label.title}`}
            onClick={(e: any) => {
              e.stopPropagation();
            }}
          >
            <Link underline="hover" variant="body2" sx={{ cursor: 'pointer' }}>
              #{label.title}
            </Link>
          </RouteLink>
        ))}
      </Box>
    );
  }
};

export default NoteLabels;
