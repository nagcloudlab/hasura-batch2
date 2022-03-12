import { Paper, Box, Typography } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetProfileQuery } from "../../generated/graphql";

interface Props { }

export const UserProfile = (props: Props) => {
  const { id } = useParams<{ id: string }>();
  console.log(id)
  const { data, loading, error } = useGetProfileQuery({ variables: { id } });

  if (error) {
    return (
      <Typography variant="body1" color="error">
        {error.message}
      </Typography>
    );
  }

  return loading ? (
    <Typography variant="caption">Loading...</Typography>
  ) : (
    <>
      <Paper elevation={1}>
        <Box padding={2} marginTop={2}>
          <Typography variant="caption">Profile: </Typography>
          <Typography variant="h6">
            {data?.user_profile?.displayName}
          </Typography>
          <Typography variant="subtitle2">
            Email: {data?.user_profile?.email}
          </Typography>
        </Box>
      </Paper>
    </>
  );
};
