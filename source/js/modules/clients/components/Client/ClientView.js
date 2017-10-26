import React from 'react';
import {observer} from 'mobx-react';
import {InputField, DatePickerField, NumberField, SelectField} from 'common/form/fields';

export default observer((props) => {
  const {form} = props;
  return (
    <div>
      <h1>Добавление клиента</h1>
      <form onSubmit={form.onSubmit}>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField field={form.$('abbreviation')} maxLength={255} />
            <span class=''>Сокращенное наименование</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField field={form.$('name')} maxLength={255} />
            <span class=''>Полное наименование</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField field={form.$('opf')} />
            <span class=''>Организационно-правовая форма</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <NumberField field={form.$('inn')} maxLength={12} />
            <span class=''>ИНН</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField field={form.$('orgn')} />
            <span class=''>ОГРН</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <DatePickerField field={form.$('registrationDate')} />
            <span class=''>Дата регистрации</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField field={form.$('city')} maxLength={100} />
            <span class=''>Город</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField field={form.$('directorFullName')} />
            <span class=''>ФИО директора (индивидуального предпринимателя)</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField field={form.$('okved')} />
            <span class=''>Основной ОКВЭД</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField field={form.$('taxSystem')} />
            <span class=''>Система налогообложения</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField type='checkbox' field={form.$('is1cBase')} id='is1cBase' hideTips={true} />
            <label for='is1cBase' className='label_check'>
              <i className='icon' />
              <span class='f_small'>Наличие своей базы 1С</span>
            </label>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <DatePickerField field={form.$('connectDate')} />
            <span class=''>Дата подключения</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <DatePickerField field={form.$('accountingStartDate')} />
            <span class=''>Дата начала ведения учета</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <SelectField field={form.$('connectStatus')}
              options={form.$('connectStatus').extra}
              searchable={false} />
            <span class=''>Статус подключения</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField field={form.$('tariff')} />
            <span class=''>Тариф</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField hideTips={true} id='isChargedForTariff' type='checkbox' field={form.$('isChargedForTariff')} />
            <label for='isChargedForTariff' className='label_check'>
              <i className='icon' />
              <span className='f_small'>Списано за тариф</span>
            </label>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField hideTips={true} id='is1cBaseCreated' type='checkbox' field={form.$('is1cBaseCreated')} />
            <label for='is1cBaseCreated' className='label_check'>
              <i className='icon' />
              <span class='f_small'>Наличие созданной базы 1С</span>
            </label>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField field={form.$('checkingAccount')} />
            <span class=''>Расчетный счет</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <NumberField field={form.$('employeesCount')} maxLength={60} />
            <span class=''>Количество сотрудников</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <NumberField field={form.$('payDate')} maxLength={2} />
            <span class=''>Дата выплаты заработной платы</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <NumberField field={form.$('advanceDate')} maxLength={2} />
            <span class=''>Дата выплаты аванса по зарплате</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <NumberField field={form.$('cashRegistersCount')} maxLength={60} />
            <span class=''>Количество кассовых аппаратов (БСО)</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField field={form.$('acquiring')} />
            <span class=''>Эквайринг</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField field={form.$('internetAcquiring')} />
            <span class=''>Интернет-эквайринг</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField type='checkbox' field={form.$('isAgencySchemes')} />
            <span class=''>Агентские схемы</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField field={form.$('otherAccountingSystems')} maxLength={1000}/>
            <span class=''>Другие системы Бухучета</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <SelectField field={form.$('insuranceBuyOrder')}
                         options={form.$('insuranceBuyOrder').extra}
                         searchable={false} />
            <span class=''>Порядок уплаты страховых взносов</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField field={form.$('snils')} />
            <span class=''>СНИЛС</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <DatePickerField field={form.$('disconnectDate')} />
            <span class=''>Дата отключения</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField field={form.$('disconnectCause')} maxLength={255}/>
            <span class=''>Причина отключения</span>
          </div>
        </div>
        <button class='button second' type='submit'>
          Добавить клиента
        </button>
      </form>
    </div>
  );
});
