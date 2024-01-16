import React, { useCallback, useEffect, useState } from 'react';
import {
  CampaignsPageMain,
  CampaignsInfluencerPageCharts,
} from 'features/campaigns/styles';
import { DCampaignsInfluencerHead } from 'features/campaigns/data';
import {
  CardWithChart,
  CardWithText,
  NewCheckboxTable,
} from 'components/custom';
import {
  CampaignsSmallIcon,
  EditIcon,
  FinishedIcon,
  InfoIcon,
  InpreparationIcon,
  ManageIcon,
  OngoingIcon,
  VerticalDotsIcon,
} from 'components/svg';
import { Pagination } from 'components/ui';
import { Stack } from 'components/system';
import { TTableRenderItemObject } from 'components/custom/table/types';
import { useMenu, useModal, usePagination } from 'hooks';
import { CampaignAPI, InsightsAPI } from 'api';
import Chip from 'components/ui/chip';
import { BackupTableRounded } from '@mui/icons-material';
import { hasEndDatePassed } from 'utilities/calendar';
import { useAppContext } from 'context';
import InfluencerProductStatusChips from 'components/custom/InfluencerProductStatusChips';
import { ProductOrderInfluencerStatus } from 'api/platformProduct/enums';
import { fetchAndCacheData } from 'utilities/local-storage';
import { useNotification } from 'hooks/use-notification';
import { ISpan, ActionsMenu } from './styles';
import InfluencerActions from './elements/influencer-actions';
import { IInfluencerCampaignResponse, IProductOrderCampaign } from './types';
import CampaignModal from './elements/campaign-modal';
import { AvailableCampaignInfluencerStatus, OnGoingCampaignInfluencerStatus } from './data';

const CampaignsPage = () => {
  const { newNotification, clearNewNotification } = useNotification();
  const [inPrepCampaigns, setInPrepCampaigns] = useState<
    IProductOrderCampaign[]
  >([]);

  const [ongoingCampaigns, setOngoingCampaigns] = useState<
    IProductOrderCampaign[]
  >([]);

  const [checkedInPrepCampaigns, setCheckedInPrepCampaigns] = useState<
    number[]
  >([]);
  const [checkedOngoingCampaigns, setCheckedOngoingCampaigns] = useState<
    number[]
  >([]);

  const [clickedRowData, setClickedRowData] = useState<any | undefined>();

  const [tModal, openTModal, closeTModal] = useModal(false);
  const [oCModal, openOCModal, closeOCModal] = useModal(false);
  const [ciModal, openCiModal, closeCiModal] = useModal(false);

  const [menuIP, openIP, setOpenIP, buttonIPRef, positionIP] = useMenu(false);
  const [menuOC, openOC, setOpenOC, buttonOCRef, positionOC] = useMenu(false);

  const handleMenuIP = () => {
    setOpenIP((prevState: boolean) => !prevState);
  };
  const handleMenuOC = () => {
    setOpenOC((prevState: boolean) => !prevState);
  };

  // This is for future profing, influencer currently does not have bulk actions
  const toggleIPCampaign = (rowId: number, checked: boolean) => {
    if (checked) {
      setCheckedInPrepCampaigns([...checkedInPrepCampaigns, rowId]);
    } else {
      setCheckedInPrepCampaigns(
        checkedInPrepCampaigns.filter((id) => id !== rowId)
      );
    }
  };

  // This is for future profing, influencer currently does not have bulk actions
  const toggleAllCheckedIPCampaigns = (checked: boolean) => {
    if (checked) {
      const currentPageIds = inPrepCampaigns.map((row: any) => row.id);
      const newSelectedRows = Array.from(
        new Set([...checkedInPrepCampaigns, ...currentPageIds])
      );
      setCheckedInPrepCampaigns(newSelectedRows);
    } else {
      const currentPageIds = inPrepCampaigns.map((row: any) => row.id);
      const newSelectedRows = checkedInPrepCampaigns.filter(
        (rowId) => !currentPageIds.includes(rowId)
      );
      setCheckedInPrepCampaigns(newSelectedRows);
    }
  };

  const toggleOngoingCampaign = (rowId: number, checked: boolean) => {
    if (checked) {
      setCheckedOngoingCampaigns([...checkedOngoingCampaigns, rowId]);
    } else {
      setCheckedOngoingCampaigns(
        checkedOngoingCampaigns.filter((id) => id !== rowId)
      );
    }
  };

  // This is for future profing, influencer currently does not have bulk actions
  const toggleAllCheckedOngoingCampaigns = (checked: boolean) => {
    if (checked) {
      const currentPageIds = ongoingCampaigns.map((row: any) => row.id);
      const newSelectedRows = Array.from(
        new Set([...checkedOngoingCampaigns, ...currentPageIds])
      );
      setCheckedOngoingCampaigns(newSelectedRows);
    } else {
      const currentPageIds = ongoingCampaigns.map((row: any) => row.id);
      const newSelectedRows = checkedOngoingCampaigns.filter(
        (rowId) => !currentPageIds.includes(rowId)
      );
      setCheckedOngoingCampaigns(newSelectedRows);
    }
  };

  const {
    pagesCount: pagesACCount,
    page: aCPage,
    setTotalResults: setTotalACResults,
    handlePageChange: handleACPageChange,
    reload: aCReload,
  } = usePagination({
    limit: 3,
    page: 1,
    onChange: async (params, setPage) => {
      const { result, meta }: IInfluencerCampaignResponse =
        await CampaignAPI.getCampaigns({
          limit: params.limit,
          skip: params.skip,
          status: 0,
          influencerStatus: AvailableCampaignInfluencerStatus.join(','),
        });

      setPage(params.page);
      setInPrepCampaigns(result);
      setTotalACResults(meta.countFiltered);
    },
  });

  const {
    pagesCount: pagesOCCount,
    page: oCPage,
    setTotalResults: setTotalOCResults,
    handlePageChange: handleOCPageChange,
    reload: oCReload,
  } = usePagination({
    limit: 3,
    page: 1,
    onChange: async (params, setPage) => {
      const { result, meta }: IInfluencerCampaignResponse =
        await CampaignAPI.getCampaigns({
          limit: params.limit,
          skip: params.skip,
          status: [1, 2].join(','),
          influencerStatus: OnGoingCampaignInfluencerStatus.join(','),
        });

      setPage(params.page);

      setOngoingCampaigns(result);
      setTotalOCResults(meta.countFiltered);
    },
  });

  const bulkIPActions = [
    {
      icon: <InfoIcon />,
      label: 'Info',
      action: () => {},
    },
    {
      icon: <ManageIcon />,
      label: 'Manage',
      action: () => {},
    },
    {
      icon: <EditIcon />,
      label: 'Edit',
      action: () => {},
    },
    {
      icon: <BackupTableRounded />,
      label: 'Columns',
      action: () => {
        openTModal();
        handleMenuIP();
      },
    },
  ];

  const bulkOCActions = [
    {
      icon: <InfoIcon />,
      label: 'Info',
      action: () => {},
    },
    {
      icon: <ManageIcon />,
      label: 'Manage',
      action: () => {},
    },
    {
      icon: <EditIcon />,
      label: 'Edit',
      action: () => {},
    },
    {
      icon: <BackupTableRounded />,
      label: 'Columns',
      action: () => {
        openOCModal();
        handleMenuOC();
      },
    },
  ];

  const renderACItem = ({ headItem, row }: TTableRenderItemObject) => {
    const availableCampaign = row.data as IProductOrderCampaign;
    if (headItem.reference === 'name') {
      return availableCampaign.name;
    }
    if (headItem.reference === 'company') {
      return availableCampaign.platformProductOrder.client.company.name;
    }
    if (headItem.reference === 'product') {
      return availableCampaign.products
        .map((product: any) => product.product.name)
        .join(', ');
    }

    if (headItem.reference === 'platform') {
      switch (availableCampaign.socialPlatformId) {
        case 1:
          return 'Instagram';
        default:
          return '';
      }
    }

    if (headItem.reference === 'amount') {
      return `CHF ${availableCampaign.platformProductOrder.platformProductOrderInfluencers[0]?.agreedAmount}`;
    }

    if (headItem.reference === 'postType') {
      return availableCampaign.postType.name;
    }

    if (headItem.reference === 'status') {
      const status =
        availableCampaign.platformProductOrder
          .platformProductOrderInfluencers[0]?.status;
      if (
        (availableCampaign.dateEnd &&
          !hasEndDatePassed(availableCampaign.dateEnd)) ||
        !availableCampaign.dateEnd
      ) {
        if (
          status === ProductOrderInfluencerStatus.ToBeSubmitted &&
          availableCampaign.platformProductOrder.status === 0
        ) {
          return <Chip type="default" size="small" label="Pending" />;
        }

        return <InfluencerProductStatusChips status={status} />;
      }
      return <Chip type="danger" size="small" label="Ended" />;
    }
    if (headItem.reference === 'actions') {
      const status =
        availableCampaign.platformProductOrder
          .platformProductOrderInfluencers[0]?.status;
      let actionLabels: string[] = [];
      if ([0, 1].includes(status)) {
        actionLabels = [...actionLabels, 'Apply', 'Decline'];
      }
      if ([2, 6, 7, 8, 9, 10, 11, 13].includes(status)) {
        actionLabels.push('Info');
      }
      if ([2, 6, 7, 8, 9, 10, 13].includes(status)) {
        actionLabels.push('Leave');
      }
      return (
        <InfluencerActions
          data={availableCampaign}
          reload={
            availableCampaign.platformProductOrder.status === 0
              ? aCReload
              : oCReload
          }
          onClick={(e) => e.stopPropagation()}
          actionLabels={actionLabels}
        />
      );
    }

    return '';
  };

  const [campaignsOverTime1, setCampaignsOverTime1] = useState<any>([]);
  const [campaignsOverTime2, setCampaignsOverTime2] = useState<any>([]);
  const [campaignsOverTime3, setCampaignsOverTime3] = useState<any>([]);

  const { user } = useAppContext();

  const getCampaignsOverTimeData = async (queryParams: any): Promise<any> => {
    try {
      const response =
        await InsightsAPI.getInfluencersInfluencerCampaignsOverTimeData(
          user.id,
          {
            ...queryParams,
          }
        );

      if (response.data) {
        return response;
      }

      throw new Error('Error: Failed to fetch data!');
    } catch (error) {
      throw new Error('Error: Failed to fetch data!');
    }
  };

  const handleClickTableRow = useCallback((rowData: any) => {
    setClickedRowData(rowData);
    openCiModal();
  }, []);

  const getInfluencerCampaignGraphDataAsync =
    (
      status: number,
      setDataFunction: (data: any) => void,
      key: string,
      forceUpdate: boolean = false
    ) =>
    async () => {
      const result = await fetchAndCacheData(
        () =>
          getCampaignsOverTimeData({
            status,
            statusAtPointOfTime: true,
            useStrictPeriod: false,
            numberOfPoints: 30,
            graphType: 'cumulative',
            includeData: ['changePercentageMonth'],
          }),
        key,
        forceUpdate
      );

      setDataFunction(result);
    };

  const getCurrentAvailableCampaign = useCallback(async () => {
    const { result, meta }: IInfluencerCampaignResponse =
      await CampaignAPI.getCampaigns({
        limit: 3,
        skip: (aCPage - 1) * 3,
        status: 0,
        influencerStatus: AvailableCampaignInfluencerStatus.join(','),
      });

    setInPrepCampaigns(result);
    setTotalACResults(meta.countFiltered);
  }, [aCPage, setInPrepCampaigns, setTotalACResults]);

  const getCurrentOngoingCampaign = useCallback(async () => {
    const { result, meta }: IInfluencerCampaignResponse =
      await CampaignAPI.getCampaigns({
        limit: 3,
        skip: (oCPage - 1) * 3,
        status: [1, 2].join(','),
        influencerStatus: OnGoingCampaignInfluencerStatus.join(','),
      });

    setOngoingCampaigns(result);
    setTotalOCResults(meta.countFiltered);
  }, [oCPage, setOngoingCampaigns, setTotalOCResults]);

  useEffect(() => {
    if (
      newNotification &&
      newNotification.type > 200 &&
      newNotification.type < 300
    ) {
      getCurrentAvailableCampaign();
      getCurrentOngoingCampaign();
      clearNewNotification();
    }
  }, [
    getCurrentAvailableCampaign,
    getCurrentOngoingCampaign,
    newNotification,
    inPrepCampaigns,
    ongoingCampaigns,
  ]);

  useEffect(() => {
    getInfluencerCampaignGraphDataAsync(
      0,
      setCampaignsOverTime1,
      'setCampaignsOverTime1'
    )();

    getInfluencerCampaignGraphDataAsync(
      1,
      setCampaignsOverTime2,
      'setCampaignsOverTime2'
    )();

    getInfluencerCampaignGraphDataAsync(
      2,
      setCampaignsOverTime3,
      'setCampaignsOverTime3'
    )();
  }, []);

  return (
    <CampaignsPageMain>
      <CampaignsInfluencerPageCharts>
        <CardWithChart
          title="Available"
          icon={<InpreparationIcon />}
          smallIcon={<CampaignsSmallIcon />}
          percent={
            campaignsOverTime1?.changePercentageMonth || Number(0).toFixed(2)
          }
          count={
            campaignsOverTime1?.data
              ? campaignsOverTime1?.data[campaignsOverTime1.data.length - 1]
                  .value
              : 0
          }
          chartData={{
            values:
              campaignsOverTime1?.data &&
              campaignsOverTime1.data.map((element: any) => element.value),
            labels:
              campaignsOverTime1?.data &&
              campaignsOverTime1?.data.map((element: any) => element.value),
          }}
        />
        <CardWithChart
          title="Ongoing"
          icon={<OngoingIcon />}
          smallIcon={<CampaignsSmallIcon />}
          percent={
            campaignsOverTime2?.changePercentageMonth || Number(0).toFixed(2)
          }
          count={
            campaignsOverTime2?.data
              ? campaignsOverTime2?.data[campaignsOverTime2.data.length - 1]
                  .value
              : 0
          }
          chartData={{
            values:
              campaignsOverTime2?.data &&
              campaignsOverTime2.data.map((element: any) => element.value),
            labels:
              campaignsOverTime2?.data &&
              campaignsOverTime2?.data.map((element: any) => element.value),
          }}
        />
        <CardWithChart
          title="Finished"
          icon={<FinishedIcon />}
          smallIcon={<CampaignsSmallIcon />}
          percent={
            campaignsOverTime3?.changePercentageMonth || Number(0).toFixed(2)
          }
          count={
            campaignsOverTime3?.data
              ? campaignsOverTime3?.data[campaignsOverTime3.data.length - 1]
                  .value
              : 0
          }
          chartData={{
            values:
              campaignsOverTime3?.data &&
              campaignsOverTime3.data.map((element: any) => element.value),
            labels:
              campaignsOverTime3?.data &&
              campaignsOverTime3?.data.map((element: any) => element.value),
          }}
        />
      </CampaignsInfluencerPageCharts>
      <CardWithText
        title="Available Campaigns"
        style={
          window.innerWidth < 600
            ? { padding: '1.25rem', boxShadow: 'unset' }
            : { padding: '1.25rem', boxShadow: '0px 2px 5px #00000010' }
        }
        actions={[]}
      >
        <Stack>
          <NewCheckboxTable
            head={DCampaignsInfluencerHead}
            items={inPrepCampaigns}
            renderItem={renderACItem}
            checkedRows={checkedInPrepCampaigns}
            onSingleSelect={toggleIPCampaign}
            onSelectAll={toggleAllCheckedIPCampaigns}
            tableColModal={tModal}
            closeTableColModal={closeTModal}
            onClickRow={(rowData) => handleClickTableRow(rowData)}
            renderElements={
              <>
                <ISpan onClick={handleMenuIP} ref={buttonIPRef}>
                  <VerticalDotsIcon />
                </ISpan>
                {openIP && (
                  <ActionsMenu
                    position={positionIP}
                    items={bulkIPActions}
                    ref={menuIP}
                  />
                )}
              </>
            }
          />
          <Pagination
            style={{
              paddingTop: 'unset',
              marginTop: 'auto',
              justifyContent: 'rigth',
            }}
            onChange={(_e, x) => handleACPageChange(x)}
            page={aCPage}
            count={pagesACCount}
          />
        </Stack>
      </CardWithText>
      <CardWithText
        title="Ongoing Campaigns"
        style={
          window.innerWidth < 600
            ? { padding: '1.25rem', boxShadow: 'unset' }
            : { padding: '1.25rem', boxShadow: '0px 2px 5px #00000010' }
        }
      >
        <Stack>
          <NewCheckboxTable
            head={DCampaignsInfluencerHead}
            items={ongoingCampaigns}
            renderItem={renderACItem}
            checkedRows={checkedOngoingCampaigns}
            onSingleSelect={toggleOngoingCampaign}
            onSelectAll={toggleAllCheckedOngoingCampaigns}
            tableColModal={oCModal}
            closeTableColModal={closeOCModal}
            onClickRow={(rowData) => handleClickTableRow(rowData)}
            renderElements={
              <>
                <ISpan onClick={handleMenuOC} ref={buttonOCRef}>
                  <VerticalDotsIcon />
                </ISpan>
                {openOC && (
                  <ActionsMenu
                    position={positionOC}
                    items={bulkOCActions}
                    ref={menuOC}
                  />
                )}
              </>
            }
          />
          <Pagination
            style={{
              paddingTop: 'unset',
              marginTop: 'auto',
              justifyContent: 'right',
            }}
            onChange={(_e, x) => handleOCPageChange(x)}
            page={oCPage}
            count={pagesOCCount}
          />
        </Stack>
      </CardWithText>
      {ciModal && (
        <CampaignModal
          reload={
            clickedRowData.platformProductOrder.status === 0
              ? aCReload
              : oCReload
          }
          onClose={closeCiModal}
          data={clickedRowData}
        />
      )}
    </CampaignsPageMain>
  );
};

export default CampaignsPage;
