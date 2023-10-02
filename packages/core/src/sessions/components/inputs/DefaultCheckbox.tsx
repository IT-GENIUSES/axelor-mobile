/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {Checkbox} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';

interface props {
  style?: any;
  value?: boolean;
  onChange?: (value: boolean) => void;
  hidden?: boolean;
}

const DefaultCheckbox = ({style, value, onChange, hidden = false}: props) => {
  const I18n = useTranslator();

  if (hidden) {
    return null;
  }

  return (
    <Checkbox
      title={I18n.t('Base_Connection_DefaultSession')}
      isDefaultChecked={value}
      onChange={onChange}
      iconSize={30}
      style={[styles.checkbox, style]}
    />
  );
};

const styles = StyleSheet.create({
  checkbox: {
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
});

export default DefaultCheckbox;