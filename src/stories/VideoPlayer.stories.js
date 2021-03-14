import React from 'react';
import { storiesOf } from '@storybook/react';

import VideoPlayer from '../videoplayer';

const stories = storiesOf('hodots. Video Player', module);

stories.add('Video Player', () => {
    return (<VideoPlayer />);
})