import React from 'react';
import ReactDom from 'react-dom';
import Profile from '../components/Profile';

it ("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<Profile></Profile>, div)
})