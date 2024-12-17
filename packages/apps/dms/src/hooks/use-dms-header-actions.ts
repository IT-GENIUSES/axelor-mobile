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

import {useEffect} from 'react';
import {
  headerActionsProvider,
  useNavigation,
  usePermitted,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {getAction} from '../utils';

export const useDMSHeaders = () => {
  useAllDocumentsActions();
  useAttachedFilesGenericAction();
};

const useAllDocumentsActions = () => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const I18n = useTranslator();

  useEffect(() => {
    headerActionsProvider.registerModel('dms_all_documents', {
      actions: [
        {
          key: 'newDocument',
          order: 10,
          iconName: 'plus-lg',
          title: I18n.t('Dms_NewDocument'),
          iconColor: Colors.primaryColor.background,
          onPress: () => navigation.navigate('DocumentFormScreen'),
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, navigation]);
};

const useAttachedFilesGenericAction = () => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.dms.db.DMSFile',
  });

  const {mobileSettings} = useSelector((state: any) => state.appConfig);

  useEffect(() => {
    headerActionsProvider.registerGenericAction(
      'dms_attachedFiles',
      async ({model, modelId, options}) =>
        await getAction({
          model,
          modelId,
          options,
          canCreateObject:
            canCreate &&
            mobileSettings?.isFolderCreationAllowed &&
            mobileSettings?.isFileCreationAllowed,
          navigation,
          translator: I18n.t,
        }),
    );
  }, [canCreate, I18n.t, mobileSettings, navigation]);
};