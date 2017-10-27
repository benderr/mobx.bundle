import React from 'react';
import {observer} from 'mobx-react';
import {InputField, DatePickerField, NumberField, SelectField, CheckboxField} from 'common/form/fields/index';

export default observer((props) => {
  const {form} = props;
  return (
    <div>
      <h1>Добавление клиента</h1>
      <form onSubmit={form.onSubmit} >
        <div className='form_group'>
          <InputField field={form.$('abbreviation')} maxLength={255} />
          <span class=''>Сокращенное наименование</span>
        </div>
        <div className='form_group'>
          <InputField field={form.$('name')} maxLength={255} />
          <span class=''>Полное наименование</span>
        </div>
        <div className='form_group'>
          <InputField field={form.$('opf')} />
          <span class=''>Организационно-правовая форма</span>
        </div>
        <div className='form_group'>
          <NumberField field={form.$('inn')} maxLength={12} />
          <span class=''>ИНН</span>
        </div>
        <div className='form_group'>
          <NumberField field={form.$('kpp')} />
          <span class=''>КПП</span>
        </div>
        <div className='form_group'>
          <InputField field={form.$('orgn')} />
          <span class=''>ОГРН</span>
        </div>
        <div className='form_group'>
          <DatePickerField field={form.$('registrationDate')} />
          <span class=''>Дата регистрации</span>
        </div>
        <div className='form_group'>
          <InputField field={form.$('city')} maxLength={100} />
          <span class=''>Город</span>
        </div>
        <div className='form_group'>
          <InputField field={form.$('directorFullName')} />
          <span class=''>ФИО директора (индивидуального предпринимателя)</span>
        </div>
        <div className={'light_block'}>
          <h3>{form.$('contacts').label}</h3>
          <div className='form_group'>
            <InputField field={form.$('contacts').fields.get('directorFullName')} />
            <span class=''>ФИО</span>
          </div>
          <div className='form_group'>
            <InputField field={form.$('contacts').fields.get('post')} />
            <span class=''>Должность</span>
          </div>
          <div className='form_group'>
            <InputField field={form.$('contacts').fields.get('email')} />
            <span class=''>Email</span>
          </div>
          <div className='form_group'>
            <NumberField field={form.$('contacts').fields.get('phone')} />
            <span class=''>Телефон</span>
          </div>
          <div className='form_group'>
            <InputField field={form.$('contacts').fields.get('description')} />
            <span class=''>Примечание</span>
          </div>
        </div>
        <div className='form_group'>
          <SelectField field={form.$('okved')} />
          <span class=''>Основной ОКВЭД</span>
        </div>
        <div className={'light_block'}>
          <h3>{form.$('taxSystem').label}</h3>
          <div className='form_group'>
            <SelectField field={form.$('taxSystem').fields.get('taxSystem')} />
            <span class=''>Система налогообложения</span>
          </div>
          <div className='form_group'>
            <NumberField field={form.$('taxSystem').fields.get('usnRate')} maxLength={60} />
            <span class=''>Ставка УСН</span>
          </div>
          <div className='form_group'>
            <CheckboxField field={form.$('taxSystem').fields.get('envd')}
              placeholder={'Единый налог на вмененный доход'} />
          </div>
          <div className='form_group'>
            <CheckboxField field={form.$('taxSystem').fields.get('psn')}
              placeholder={'Патентная система налогообложения'} />
          </div>
        </div>
        <div className='form_group'>
          <CheckboxField field={form.$('is1cBase')}
            placeholder={'Наличие своей базы 1С'} />
        </div>
        <div className='form_group'>
          <DatePickerField field={form.$('connectDate')} />
          <span class=''>Дата подключения</span>
        </div>
        <div className='form_group'>
          <DatePickerField field={form.$('accountingStartDate')} />
          <span class=''>Дата начала ведения учета</span>
        </div>
        <div className='form_group'>
          <SelectField field={form.$('connectStatus')}
            options={form.$('connectStatus').extra}
            searchable={false} />
          <span class=''>Статус подключения</span>
        </div>
        <div className='form_group'>
          <InputField field={form.$('tariff')} />
          <span class=''>Тариф</span>
        </div>
        <div className='form_group'>
          <CheckboxField field={form.$('isChargedForTariff')}
            placeholder={'Списано за тариф'} />
        </div>
        <div className='form_group'>
          <CheckboxField field={form.$('is1cBaseCreated')}
            placeholder={'Наличие созданной базы 1С'} />
        </div>
        <div className='form_group'>
          <CheckboxField field={form.$('is1cConnectStatus')}
            placeholder={'Статус подключения к 1С Отчетности'} />
        </div>
        <div className={'light_block'}>
          <h3>{form.$('checkingAccount').label}</h3>
          <div className='form_group'>
            <InputField field={form.$('checkingAccount').fields.get('bik')} />
            <span class=''>БИК или Наименование банка</span>
          </div>
          <div className='form_group'>
            <InputField field={form.$('checkingAccount').fields.get('checkingAccount')} />
            <span class=''>Расчетный счет</span>
          </div>
          <div className='form_group'>
            <InputField field={form.$('checkingAccount').fields.get('correspondentAccount')} />
            <span class=''>Корреспондентский счет</span>
          </div>
          <div className='form_group'>
            <InputField field={form.$('checkingAccount').fields.get('description')} />
            <span class=''>Описание</span>
          </div>
        </div>

        {/* <div className='form_group'>*/}
        {/* <NumberField field={form.$('employeesCount')} maxLength={60} />*/}
        {/* <span class=''>Количество сотрудников</span>*/}
        {/* </div>*/}
        {/* <div className={`form_group ${ form.$('payDate').extra.containerClassName }`}>*/}
        {/* <NumberField field={form.$('payDate')} maxLength={2} />*/}
        {/* <span class=''>Дата выплаты заработной платы</span>*/}
        {/* </div>*/}
        {/* <div className={`form_group ${ form.$('advanceDate').extra.containerClassName }`}>*/}
        {/* <NumberField field={form.$('advanceDate')} maxLength={2} />*/}
        {/* <span class=''>Дата выплаты аванса по зарплате</span>*/}
        {/* </div>*/}
        <div className='form_group'>
          <NumberField field={form.$('cashRegistersCount')} maxLength={60} />
          <span class=''>Количество кассовых аппаратов (БСО)</span>
        </div>
        <DescriptionCheckbox field={form.$('acquiring')} placeholder={'Эквайринг'} />
        <DescriptionCheckbox field={form.$('internetAcquiring')} placeholder={'Интернет-эквайринг'} />
        <div className='form_group'>
          <InputField field={form.$('otherAccountingSystems')} maxLength={1000} />
          <span class=''>Другие системы Бухучета</span>
        </div>
        <div className='form_group'>
          <SelectField field={form.$('insuranceBuyOrder')}
            options={form.$('insuranceBuyOrder').extra}
            searchable={false} />
          <span class=''>Порядок уплаты страховых взносов</span>
        </div>
        <div className='form_group'>
          <InputField field={form.$('snils')} />
          <span class=''>СНИЛС</span>
        </div>
        <div className='form_group'>
          <DatePickerField field={form.$('disconnectDate')} />
          <span class=''>Дата отключения</span>
        </div>
        {/* <div className={`form_group ${ form.$('disconnectCause').extra.containerClassName }`}>*/}
        {/* <InputField field={form.$('disconnectCause')} maxLength={255} />*/}
        {/* <span class=''>Причина отключения</span>*/}
        {/* </div>*/}
        <button class='button second' type='submit'>
          Добавить клиента
        </button>
      </form>
    </div>
  );
});

// const DescriptionCheckbox = observer(({field, placeholder}) =>
//   <div className='form_group'>
//     <CheckboxField field={field.fields.get('value')}
//       placeholder={placeholder} />
//     <InputField field={field.fields.get('description')} maxLength={1000} />
//     <span class=''>Описание</span>
//   </div>);

const DescriptionCheckbox = observer(({field, placeholder}) => {
  const value = field.fields.get('value');
  const description = field.fields.get('description');
  const decriptionClassName = value.value === false ? 'hidden' : '';
  console.log(value);
  return (
    <div className={'light_block'}>
      <div className='form_group'>
        <CheckboxField field={value}
          placeholder={placeholder} />
      </div>
      <div className={decriptionClassName}>
        <InputField field={description} maxLength={1000} />
        <span class=''>Описание</span>
      </div>
    </div>
  );
});
