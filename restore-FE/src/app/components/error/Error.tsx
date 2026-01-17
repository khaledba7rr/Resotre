import { Box, Button, Divider, Link, Typography } from "@mui/material";

import ErrorIcon from "@mui/icons-material/Error";

interface ErrorProps {
  message?: string;
}

function Error({ message }: ErrorProps) {
  return (
    <Box sx={{ padding: "20px", textAlign: "center", mx: "auto", my: "auto" }}>
      <ErrorIcon color="error" sx={{ fontSize: 60 }} />
      <Divider sx={{ marginY: 2 }} />
      <Typography variant="h6" component="h1">
        Error: {message}
      </Typography>
      <Button
        component={Link}
        href="/"
        sx={{ marginTop: 2 }}
        variant="contained"
      >
        Try again
      </Button>
    </Box>
  );
}

export default Error;
