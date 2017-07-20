/**
 * Created by RobertSabiryanov on 12.07.17.
 */
import React from 'react';
import {InfinateScroll} from 'common/uiElements';
import renderer from 'react-test-renderer';

const itemsLength = 51;
let loadNext =()=>{

};

test('Infinate default class on loading=false', () => {

	const loading = false;

	const component = renderer.create(
		<InfinateScroll loadNext={loadNext} totalCount={itemsLength} listLength={50} loading={loading}/>
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Infinate loading class on loading=true', () => {
    const loading = true;
    const component = renderer.create(
		<InfinateScroll loadNext={loadNext} totalCount={itemsLength} listLength={50} loading={loading}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

//todo про jest -u