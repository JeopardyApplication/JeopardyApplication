import React, { useState, useEffect, ChangeEvent } from 'react';
import _ from 'lodash';
import { Theme, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';

import Modal from '../modals/Modal';

import {
  CATEGORY_COUNT,
  SELECTED_CATEGORIES,
  SET_CATEGORIES,
  MENUPROPS,
  SELECTED_CLUE,
} from '../constants';
import { fetchCategories, fetchCategory } from '../../API';
import { useStyles } from '../../App.styles';

function getStyles(name: string, categoryName: string[], theme: Theme) {
  return {
    fontWeight:
      categoryName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function BoardView() {
  const classes = useStyles();
  const theme = useTheme();
  const [flagedClues, setFlagedClues] = useState<SELECTED_CATEGORIES[]>([]);
  const [activeClue, setActiveClue] = useState<SELECTED_CLUE[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    SELECTED_CATEGORIES[]
  >([]);

  const [showClue, setShowClue] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showClueModal, setShowClueModal] = useState(false);
  const [categoryID, setCategoryID] = useState<number>(0);
  const [categories, setCategories] = useState(SET_CATEGORIES);
  const [clueQuantity, setClueQuantity] = useState(6);
  const [reset, setReset] = useState(false);

  const [categoryName, setCategoryName] = useState<string[]>([]);

  const handleReset = () => {
    toggleModal();
    setReset(!reset);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleClueModal = (clue: any) => {
    const flaged = [...flagedClues, clue];

    setFlagedClues(flaged);
    setActiveClue(clue);
    setShowClueModal(!showClueModal);
    if (showClue) {
      setShowClue(false);
    }
  };

  const toggleClueButton = () => {
    setShowClue(!showClue);
  };

  const handleChooseCategory = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const nodeTarget = event.currentTarget as HTMLInputElement;
    const categoryID = nodeTarget.id;
    const targetvalue = event.target.value as string[];

    const isDuplicate = _.find(selectedCategories, {
      id: Number(categoryID),
    });

    if (!isDuplicate && targetvalue.length < 6) {
      setCategoryName(targetvalue);
      setCategoryID(Number(categoryID) as number);
    }
  };

  const handleClueQuantity = (event: ChangeEvent<{ value: unknown }>) => {
    setClueQuantity(event.target.value as number);
  };

  useEffect(() => {
    setCategoryID(0);
    setClueQuantity(5);
    setCategoryName([]);
    setSelectedCategories([]);
    setFlagedClues([]);

    fetchCategories(100).then((categories) => {
      const categoriesData = categories.map((category: any) => category);
      setCategories(categoriesData);
    });
  }, [reset]);

  useEffect(() => {
    fetchCategory(categoryID).then((category: any) => {
      const categoriesData = [...selectedCategories, category];
      setSelectedCategories(categoriesData);
    });
  }, [categoryID]);

  return (
    <div>
      <div className="container">
        {selectedCategories.map((clue, index) => (
          <ul className="flex-container column" key={index}>
            <li key={index} className="flex-item-header">
              {clue.title}
            </li>
            {clue.clues.slice(0, clueQuantity).map((clue, index) => (
              <li
                key={index}
                className={
                  _.find(flagedClues, { id: Number(clue.id) })
                    ? 'flex-item-flaged'
                    : 'flex-item'
                }
                id={clue.id}
                onClick={() => toggleClueModal(clue)}
              >
                {`$${clue.value}`}
              </li>
            ))}
          </ul>
        ))}
      </div>

      <div>
        <div>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id="mutiple-chip-label">Choose Category</InputLabel>
              <Select
                labelId="mutiple-chip-label"
                id="mutiple-chip"
                multiple
                value={categoryName}
                onChange={handleChooseCategory}
                input={
                  <Input id="select-multiple-chip" className={'capitalize'} />
                }
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {(selected as string[]).map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MENUPROPS}
              >
                {categories.map((category) => (
                  <MenuItem
                    className={'capitalize'}
                    id={category.id}
                    key={category.id}
                    value={category.title}
                    style={getStyles(name, categoryName, theme)}
                  >
                    {category.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="select-outlined-label">Clues</InputLabel>
              <Select
                labelId="select-outlined-label"
                id="select-outlined"
                value={clueQuantity}
                onChange={handleClueQuantity}
                label="Clues"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {CATEGORY_COUNT.map((amount, index) => (
                  <MenuItem key={index} value={amount}>
                    {amount}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <Button variant="contained" color="secondary" onClick={toggleModal}>
              Reset
            </Button>

            {showClueModal ? (
              <Modal>
                <div>
                  <h1>
                    {showClue
                      ? _.get(activeClue, 'answer')
                      : _.get(activeClue, 'question')}
                  </h1>
                  <div className={'buttons'}>
                    <button onClick={toggleClueButton}>
                      {showClue ? 'Clue' : 'Question'}
                    </button>
                    <button onClick={toggleClueModal}>Done</button>
                  </div>
                </div>
              </Modal>
            ) : null}

            {showModal ? (
              <Modal>
                <div>
                  <h1>Are you sure you would like to rest the game?</h1>
                  <div className={'buttons'}>
                    <button onClick={toggleModal}>Cancel</button>
                    <button onClick={handleReset}>Yes, Reset Game</button>
                  </div>
                </div>
              </Modal>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
