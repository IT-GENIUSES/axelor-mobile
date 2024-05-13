/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {FormHtmlInput} from '@axelor/aos-mobile-ui';
import {useTranslator, useTypes} from '@axelor/aos-mobile-core';

const InternalMoveLineNotes = ({
  status = null,
  notes,
  setNotes = () => {},
  setSaveStatus = () => {},
  readonly = false,
}) => {
  const I18n = useTranslator();
  const {StockMove} = useTypes();

  const handleNotesChange = value => {
    setNotes(value);
    setSaveStatus(false);
  };

  return (
    <FormHtmlInput
      title={I18n.t('Stock_NotesOnStockMove')}
      onChange={handleNotesChange}
      defaultValue={notes}
      readonly={readonly || status !== StockMove?.statusSelect.Draft}
      hideIfNull={true}
    />
  );
};

export default InternalMoveLineNotes;
