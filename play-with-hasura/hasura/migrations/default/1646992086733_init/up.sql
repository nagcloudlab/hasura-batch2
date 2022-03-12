SET check_function_bodies = false;
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.comments (
    id integer NOT NULL,
    comment text NOT NULL,
    photo_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id text,
    is_published boolean,
    is_reviewed boolean
);
CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;
CREATE TABLE public.photos (
    photo_url text NOT NULL,
    description text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    id integer NOT NULL,
    user_id text,
    is_published boolean DEFAULT false,
    city_id integer
);
CREATE SEQUENCE public.photos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.photos_id_seq OWNED BY public.photos.id;
ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);
ALTER TABLE ONLY public.photos ALTER COLUMN id SET DEFAULT nextval('public.photos_id_seq'::regclass);
ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.photos
    ADD CONSTRAINT photos_pkey PRIMARY KEY (id);
CREATE TRIGGER set_public_photos_updated_at BEFORE UPDATE ON public.photos FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_photos_updated_at ON public.photos IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_photo_id_fkey FOREIGN KEY (photo_id) REFERENCES public.photos(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
