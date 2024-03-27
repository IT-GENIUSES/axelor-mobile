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

import {StopwatchType} from '@axelor/aos-mobile-core';
import {Color, ThemeColors} from '@axelor/aos-mobile-ui';

class InterventionType {
  static status = {
    Planned: 20,
    Started: 30,
    Suspended: 40,
    Finished: 50,
  };

  static getStatus = (
    status: number,
    I18n: {t: (key: string) => string},
  ): string => {
    if (I18n) {
      switch (status) {
        case this.status.Planned:
          return I18n.t('Intervention_Status_Planned');
        case this.status.Started:
          return I18n.t('Intervention_Status_Started');
        case this.status.Suspended:
          return I18n.t('Intervention_Status_Suspended');
        case this.status.Finished:
          return I18n.t('Intervention_Status_Finished');
        default:
          console.warn(
            `Status provided with value ${status} is not supported by Intervention.`,
          );
          return null;
      }
    }
  };

  static getStatusColor = (status: number, Colors: ThemeColors): Color => {
    switch (status) {
      case this.status.Planned:
        return Colors.plannedColor;
      case this.status.Started:
        return Colors.progressColor;
      case this.status.Suspended:
        return Colors.cautionColor;
      case this.status.Finished:
        return Colors.successColor;
      default:
        console.warn(
          `Status provided with value ${status} is not supported by Intervention.`,
        );
        return null;
    }
  };

  static getStatusList = (
    statusList: number[],
    Colors: ThemeColors,
    I18n: {t: (key: string) => string},
  ) => {
    return statusList.map(statusValue => {
      const key = Object.keys(this.status).find(
        _key => this.status[_key] === statusValue,
      );
      return {
        title: I18n.t(`Intervention_Status_${key}`),
        color: this.getStatusColor(statusValue, Colors),
        key: statusValue,
      };
    });
  };

  static getStopwatchStatus = (status: number): number => {
    switch (status) {
      case this.status.Planned:
        return StopwatchType.status.Ready;
      case this.status.Started:
        return StopwatchType.status.InProgress;
      case this.status.Suspended:
        return StopwatchType.status.Paused;
      case this.status.Finished:
        return StopwatchType.status.Finished;
      default:
        console.warn(
          `Status provided with value ${status} is not supported by Intervention.`,
        );
        return null;
    }
  };
}

export default InterventionType;