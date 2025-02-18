import { formatNumber, formatDate } from "../../../helpers/function";
// import { JobPostedCard } from "../landing-page/job-posted-card";
import { RecentJobsHook } from "../../../hooks/recent-jobs-hook";
import { useMemo, useState } from "react";
// import { NoInfo } from "../../../component/no-info";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
// import { ProgressBar } from "../../../component/admin/progress-bar";

const columns = [
    { id: "owner", label: "Owner", minWidth: 150 },
    { id: "title", label: "Title", minWidth: 90 },
    {
        id: "date",
        label: "Date",
        minWidth: 50,
        align: "right",
    },
    {
        id: "location",
        label: "Location",
        minWidth: 150,
        align: "right",
    },
    {
        id: "budget",
        label: "Budget",
        minWidth: 100,
        align: "right",
    },
    {
        id: "status",
        label: "Status",
        minWidth: 100,
        align: "right",
    },
];

export function JobsPage() {
    const [searchText, setSearchText] = useState("");
    const { recentJobs: jobs } = RecentJobsHook({
        page: 1,
        limit: 200,
    });

    const filter = useMemo(() => {
        return jobs.filter((item) => {
            return item.gigInfos?.[0].title
                .toLowerCase()
                .includes(searchText.toLowerCase());
        });
    }, [jobs, searchText]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selected, setSelected] = useState(null);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className="flex flex-col h-full gap-4 py-1">
            <div className="flex gap-4 items-center">
                <div className="p-2 bg-[#ECFFE7] rounded-lg text-xs font-bold w-fit">
                    {formatNumber(jobs.length)} Jobs posted
                </div>
                <div>
                    <input
                        className="p-2 px-4 bg-gray-100 rounded-md border border-adminPrimary text-xs w-[300px]"
                        placeholder="Search by title"
                        type="search"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
                {isLoading ? (
                    <p>Please wait...</p>
                ) : filter.length > 0 ? (
                    filter.map((gig) => (
                        <div
                            key={gig.uuid}
                            className="col-span-1 min-w-[200px]"
                        >
                            <JobPostedCard gig={gig} />
                        </div>
                    ))
                ) : (
                    <div className="p-4 border">
                        <NoInfo message="No information available" />
                    </div>
                )}
            </div> */}
            <Box
                sx={{
                    width: "100%",
                    overflowX: "hidden",
                    p: 0,
                    boxSizing: "border-box",
                    maxWidth: "100vw",
                }}
            >
                <TableContainer
                    padding="0"
                    sx={{
                        maxHeight: 550,
                        overflowX: "auto", // Ensures horizontal scroll on smaller screens
                        fontFamily: "Raleway, sans-serif",
                        maxWidth: "100vw",
                    }}
                    className="grid grid-cols-1 gap-4 hidden sm:block"
                >
                    <Table
                        stickyHeader
                        aria-label="sticky table"
                        padding="none"
                        sx={{
                            width: "100%", // Allow the table to adjust width within container
                            maxWidth: "100vw",
                            tableLayout: "auto",
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        style={{
                                            // minWidth: column.minWidth,
                                            fontFamily: "Raleway, sans-serif",
                                            background: "#F7F9FF",
                                            fontSize: 12,
                                            padding: "0.75rem 0.5rem",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filter
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((gig) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={gig.uuid}
                                        >
                                            <TableCell
                                                sx={{
                                                    fontFamily:
                                                        "Raleway, sans-serif",
                                                    fontSize: 11,
                                                    padding: "0.75rem 0.5rem",
                                                }}
                                            >
                                                <div className="flex gap-1 items-center">
                                                    <img
                                                        src={
                                                            gig?.user
                                                                .profilePicture
                                                        }
                                                        alt="User Avatar"
                                                        className="h-10 w-10 rounded-full"
                                                    />
                                                    <div>
                                                        <p className="font-bold text-adminPrimary">
                                                            {gig?.user
                                                                .companyName
                                                                ? gig?.user
                                                                      .companyName
                                                                : `${gig?.user.firstName} ${gig?.user.lastName}`}
                                                        </p>
                                                        <p
                                                            style={{
                                                                fontSize:
                                                                    ".5rem",
                                                            }}
                                                        >
                                                            {
                                                                gig?.user
                                                                    .finclusionId
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    fontFamily:
                                                        "Raleway, sans-serif",
                                                    fontSize: 11,
                                                    padding: "0.75rem 0.5rem",
                                                }}
                                            >
                                                {gig?.gigInfos[0]?.title}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    fontFamily:
                                                        "Raleway, sans-serif",
                                                    fontSize: 11,
                                                    padding: "0.75rem 0.5rem",
                                                }}
                                            >
                                                {formatDate(gig.gigDate)}
                                            </TableCell>

                                            <TableCell
                                                sx={{
                                                    fontFamily:
                                                        "Raleway, sans-serif",
                                                    fontSize: 11,
                                                    padding: "0.75rem 0.5rem",
                                                }}
                                            >
                                                {gig?.gigAddresses[0].address ||
                                                    "Remote"}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    fontFamily:
                                                        "Raleway, sans-serif",
                                                    fontSize: 11,
                                                    padding: "0.75rem 0.5rem",
                                                }}
                                            >
                                                ₦{formatNumber(gig.budget, 2)}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    fontFamily:
                                                        "Raleway, sans-serif",
                                                    fontSize: 11,
                                                    padding: "0.75rem 0.5rem",
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {gig.statusType}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <div className="grid grid-cols-1 gap-4 sm:hidden">
                    {data
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((item) => (
                            <GigCard gig={item.gig} key={item.uuid} />
                        ))}
                </div> */}
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={filter.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    className="text-[11px]"
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </div>
    );
}

/*
 <Box
      sx={{
        width: "100%",
        overflowX: "hidden",
        p: 0,
        boxSizing: "border-box",
        maxWidth: "100vw",
      }}
    >
      <TableContainer
        padding="0"
        sx={{
          maxHeight: 440,
          overflowX: "auto", // Ensures horizontal scroll on smaller screens
          fontFamily: "Raleway, sans-serif",
          maxWidth: "100vw",
        }}
        className="grid grid-cols-1 gap-4 hidden sm:block"
      >
        <Table
          stickyHeader
          aria-label="sticky table"
          padding="none"
          sx={{
            width: "100%", // Allow the table to adjust width within container
            maxWidth: "100vw",
            tableLayout: "auto",
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    // minWidth: column.minWidth,
                    fontFamily: "Raleway, sans-serif",
                    background: "#F7F9FF",
                    fontSize: 12,
                    padding: "0.75rem 0.5rem",
                    fontWeight: 600,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(({ gig, gigStatusType, ...rest }) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={gig.uuid}
                    onClick={() => {
                      navigate(`/gigs/${role}/details/${gig.uuid}`, {
                        state: {
                          gigData: { gig, ...rest, gigStatusType },
                        },
                      });
                    }}
                  >
                    <TableCell
                      sx={{
                        fontFamily: "Raleway, sans-serif",
                        fontSize: 11,
                        padding: "0.75rem 0.5rem",
                      }}
                    >
                      <div className="flex gap-1 items-center">
                        <img
                          src={gig?.user.profilePicture ?? avatar}
                          alt="User Avatar"
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <p className="font-bold text-adminPrimary">
                            {gig?.user.companyName
                              ? gig?.user.companyName
                              : `${gig?.user.firstName} ${gig?.user.lastName}`}
                          </p>
                          <p style={{ fontSize: ".5rem" }}>
                            {gig?.user.finclusionId}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Raleway, sans-serif",
                        fontSize: 11,
                        padding: "0.75rem 0.5rem",
                      }}
                    >
                      {gig?.gigInfos[0]?.title}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Raleway, sans-serif",
                        fontSize: 11,
                        padding: "0.75rem 0.5rem",
                      }}
                    >
                      {formatDate(gig.gigDate)}
                    </TableCell>

                    <TableCell
                      sx={{
                        fontFamily: "Raleway, sans-serif",
                        fontSize: 11,
                        padding: "0.75rem 0.5rem",
                      }}
                    >
                      {gig?.gigAddresses[0].address || "Remote"}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Raleway, sans-serif",
                        fontSize: 11,
                        padding: "0.75rem 0.5rem",
                      }}
                    >
                      ₦{formatNumber(gig.budget, 2)}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Raleway, sans-serif",
                        fontSize: 11,
                        padding: "0.75rem 0.5rem",
                        textTransform: "capitalize",
                      }}
                    >
                      {gig.statusType}
                      <ProgressBar
                        color={handleProgressColor(gig.statusType)}
                        thickness={1.2}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="grid grid-cols-1 gap-4 sm:hidden">
        {data
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((item) => (
            <GigCard gig={item.gig} key={item.uuid} />
          ))}
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        className="text-[11px]"
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {selected && (
        <EditGig form={selected} handleClose={() => setSelected(null)} />
      )}
    </Box>
*/
