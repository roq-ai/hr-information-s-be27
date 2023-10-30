import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef, useMemo } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { useRoqClient, usePayrollFindFirst } from 'lib/roq';
import * as RoqTypes from 'lib/roq/types';
import { convertQueryToPrismaUtil } from 'lib/utils';
import { payrollValidationSchema } from 'validationSchema/payrolls';
import { PayrollInterface } from 'interfaces/payroll';
import { EmployeeInterface } from 'interfaces/employee';
import { UserInterface } from 'interfaces/user';

function PayrollEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const roqClient = useRoqClient();
  const queryParams = useMemo(
    () =>
      convertQueryToPrismaUtil(
        {
          id,
        },
        'payroll',
      ),
    [id],
  );
  const { data, error, isLoading, mutate } = usePayrollFindFirst(queryParams, {}, { disabled: !id });
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PayrollInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await roqClient.payroll.update({
        data: values as RoqTypes.payroll,
        where: {
          id,
        },
      });
      mutate(updated);
      resetForm();
      router.push('/payrolls');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<PayrollInterface>({
    initialValues: data,
    validationSchema: payrollValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Payrolls',
              link: '/payrolls',
            },
            {
              label: 'Update Payroll',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Payroll
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Gross Salary"
            formControlProps={{
              id: 'gross_salary',
              isInvalid: !!formik.errors?.gross_salary,
            }}
            name="gross_salary"
            error={formik.errors?.gross_salary}
            value={formik.values?.gross_salary}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('gross_salary', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Net Salary"
            formControlProps={{
              id: 'net_salary',
              isInvalid: !!formik.errors?.net_salary,
            }}
            name="net_salary"
            error={formik.errors?.net_salary}
            value={formik.values?.net_salary}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('net_salary', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Tax"
            formControlProps={{
              id: 'tax',
              isInvalid: !!formik.errors?.tax,
            }}
            name="tax"
            error={formik.errors?.tax}
            value={formik.values?.tax}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('tax', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Deductions"
            formControlProps={{
              id: 'deductions',
              isInvalid: !!formik.errors?.deductions,
            }}
            name="deductions"
            error={formik.errors?.deductions}
            value={formik.values?.deductions}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('deductions', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Bonus"
            formControlProps={{
              id: 'bonus',
              isInvalid: !!formik.errors?.bonus,
            }}
            name="bonus"
            error={formik.errors?.bonus}
            value={formik.values?.bonus}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('bonus', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<EmployeeInterface>
            formik={formik}
            name={'employee_id'}
            label={'Select Employee'}
            placeholder={'Select Employee'}
            fetcher={() => roqClient.employee.findManyWithCount({})}
            labelField={'email'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={() => roqClient.user.findManyWithCount({})}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/payrolls')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'payroll',
    operation: AccessOperationEnum.UPDATE,
  }),
)(PayrollEditPage);
