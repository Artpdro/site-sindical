-- As solicitações passam a ser gravadas SOMENTE pela Edge Function "holiday-request"
-- (que valida os dados e envia o e-mail). Remove a inserção direta pelo público.
drop policy if exists "requests_public_insert" on public.holiday_requests;
